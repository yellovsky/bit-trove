// global modules
import { Effect } from 'effect';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Inject,
  LoggerService,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

// common modules
import { Account } from 'src/decorators/account.decorator';
import { ApiCommonErrorResponses } from 'src/utils/swagger';
import { CasbinService } from 'src/modules/casbin';
import type { DBAccount } from 'src/modules/account';
import { RuntimeService } from 'src/modules/runtime';
import { StatusSuccessResponseEntity } from 'src/common/entities/status-success';

// local modules
import { FindManyPermissionsDTO } from '../dto/find-many-permission-polices.dto';
import { GetPermissionPolicyListResponseEntity } from '../entities/permission-policy-list-response.entity';
import { PermissionPolicyAccessService } from '../services/permission-policy-access.service';
import { PermissionPolicyResponseEntity } from '../entities/permission-policy-response.entity';
import { PermissionPolicySerializerService } from '../services/permission-policy-serializer.service';
import { PermissionPolicyService } from '../services/permission-policy.service';
import { UpsertPermissionPolicyDTO } from '../dto/upsert-permission-policy.dto';

@ApiTags('Permission policies')
@Controller({ path: 'cms/permission-policies', version: '1' })
export class CMSPermissionPoliciesV1Controller {
  constructor(
    @Inject()
    private readonly runtimeSrv: RuntimeService,

    @Inject()
    private readonly permissionPolicySrv: PermissionPolicyService,

    @Inject()
    private readonly permissionPolicySerializerSrv: PermissionPolicySerializerService,

    @Inject()
    private readonly permissionPolicyAccessSrv: PermissionPolicyAccessService,

    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,

    @Inject()
    private readonly casbinSrv: CasbinService,
  ) {}

  @Get()
  @ApiOperation({ description: 'Get permissions list' })
  @ApiOkResponse({ type: GetPermissionPolicyListResponseEntity })
  @ApiCommonErrorResponses('bad_request', 'forbidden', 'unauthorized')
  async getList(
    @Query() query: FindManyPermissionsDTO,
    @Account() account: DBAccount,
  ): Promise<GetPermissionPolicyListResponseEntity> {
    const program: Effect.Effect<GetPermissionPolicyListResponseEntity, Error> =
      Effect.gen(this, function* () {
        this.logger.debug?.(
          `query: ${JSON.stringify(query)}`,
          `${CMSPermissionPoliciesV1Controller.name}.getList`,
        );

        /**
         * Check view permissions
         */
        yield* this.#canViewPermissionPolicies(account);

        /**
         * Find permission policies list
         */
        const [founded, total] = yield* Effect.all([
          this.permissionPolicySrv.getMany(null, query),
          this.permissionPolicySrv.getTotal(null, query),
        ]);

        /**
         * Filter by access control
         */
        const accessChecked =
          yield* this.permissionPolicyAccessSrv.canReadCMSFilter(
            account,
            founded,
          );

        /**
         * Serialize
         */
        return new GetPermissionPolicyListResponseEntity({
          data: yield* this.permissionPolicySerializerSrv.serializeList(
            accessChecked,
          ),
          meta: {
            pagination: {
              limit: query.page.limit,
              offset: query.page.offset,
              total,
            },
          },
        });
      });

    return this.runtimeSrv.runPromise(program);
  }

  @Get(':id')
  @ApiOperation({ description: 'Get permissions list' })
  @ApiOkResponse({ type: PermissionPolicyResponseEntity })
  @ApiCommonErrorResponses('bad_request', 'forbidden', 'unauthorized')
  async getOne(
    @Param('id') id: string,
    @Account() account: DBAccount,
  ): Promise<PermissionPolicyResponseEntity> {
    const program: Effect.Effect<PermissionPolicyResponseEntity, Error> =
      Effect.gen(this, function* () {
        this.logger.debug?.(
          `id: ${id}`,
          `${CMSPermissionPoliciesV1Controller.name}.getOne`,
        );

        /**
         * Check view permissions
         */
        yield* this.#canViewPermissionPolicies(account);

        /**
         * Find permission policy
         */
        const founded = yield* this.permissionPolicySrv.getOne(null, id);

        /**
         * Check read access
         */
        const readAllowed = yield* this.permissionPolicyAccessSrv.canReadCMS(
          account,
          founded,
        );
        if (!readAllowed) return yield* Effect.fail(new NotFoundException());

        /**
         * Serialize
         */
        const serialized =
          yield* this.permissionPolicySerializerSrv.serialize(founded);
        return new PermissionPolicyResponseEntity({ data: serialized });
      });

    return this.runtimeSrv.runPromise(program);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete permission policy by id' })
  @ApiOkResponse({ type: StatusSuccessResponseEntity })
  @ApiCommonErrorResponses('bad_request', 'forbidden', 'unauthorized')
  async deleteOne(
    @Param('id') id: string,
    @Account() account: DBAccount,
  ): Promise<StatusSuccessResponseEntity> {
    const program: Effect.Effect<StatusSuccessResponseEntity, Error> =
      Effect.gen(this, function* () {
        this.logger.debug?.(
          `id: ${id}`,
          `${CMSPermissionPoliciesV1Controller.name}.deleteOne`,
        );

        /**
         * Check delete access
         */
        const founded = yield* this.permissionPolicySrv.getOne(null, id);
        const canDelete = yield* this.permissionPolicyAccessSrv.canDelete(
          account,
          founded,
        );
        if (!canDelete) return yield* Effect.fail(new NotFoundException());

        /**
         * Delete permission policy
         */
        yield* this.permissionPolicySrv.deleteOne(null, id);

        /**
         * Always success response
         */
        return new StatusSuccessResponseEntity();
      });

    return this.runtimeSrv.runPromise(program);
  }

  @Post()
  @ApiOperation({ description: 'Create permission policy' })
  @ApiOkResponse({ type: PermissionPolicyResponseEntity })
  @ApiCommonErrorResponses('bad_request', 'forbidden', 'unauthorized')
  async create(
    @Body() body: UpsertPermissionPolicyDTO,
    @Account() account: DBAccount,
  ): Promise<PermissionPolicyResponseEntity> {
    const program: Effect.Effect<PermissionPolicyResponseEntity, Error> =
      Effect.gen(this, function* () {
        this.logger.debug?.(
          `body: ${JSON.stringify(body)}`,
          `${CMSPermissionPoliciesV1Controller.name}.create`,
        );

        /**
         * Check create access
         */
        const canCreate =
          yield* this.permissionPolicyAccessSrv.canCreate(account);
        if (!canCreate) return yield* Effect.fail(new NotFoundException());

        /**
         * Create permission policy
         */
        const created = yield* this.permissionPolicySrv.create(null, body);

        /**
         * Serialize
         */
        const serialized =
          yield* this.permissionPolicySerializerSrv.serialize(created);
        return new PermissionPolicyResponseEntity({ data: serialized });
      });

    return this.runtimeSrv.runPromise(program);
  }

  @Put(':id')
  @ApiOperation({ description: 'Update permission policy' })
  @ApiOkResponse({ type: PermissionPolicyResponseEntity })
  @ApiCommonErrorResponses('bad_request', 'forbidden', 'unauthorized')
  async update(
    @Param('id') id: string,
    @Body() body: UpsertPermissionPolicyDTO,
    @Account() account: DBAccount,
  ): Promise<PermissionPolicyResponseEntity> {
    const program: Effect.Effect<PermissionPolicyResponseEntity, Error> =
      Effect.gen(this, function* () {
        this.logger.debug?.(
          `id: ${id}`,
          `${CMSPermissionPoliciesV1Controller.name}.update`,
        );

        this.logger.debug?.(
          `body: ${JSON.stringify(body)}`,
          `${CMSPermissionPoliciesV1Controller.name}.update`,
        );

        /**
         * Check update access
         */
        /**
         * Check delete access
         */
        const founded = yield* this.permissionPolicySrv.getOne(null, id);
        const canUpdate = yield* this.permissionPolicyAccessSrv.canUpdate(
          account,
          founded,
        );
        if (!canUpdate) {
          this.logger.debug?.(
            'Permission denied',
            `${CMSPermissionPoliciesV1Controller.name}.update`,
          );
          return yield* Effect.fail(new NotFoundException());
        }

        /**
         * Create permission policy
         */
        const updated = yield* this.permissionPolicySrv.update(null, id, body);

        /**
         * Serialize
         */
        const serialized =
          yield* this.permissionPolicySerializerSrv.serialize(updated);
        return new PermissionPolicyResponseEntity({ data: serialized });
      });

    return this.runtimeSrv.runPromise(program);
  }

  #canViewPermissionPolicies(account: DBAccount): Effect.Effect<void, Error> {
    return this.casbinSrv
      .checkPermission(account.id, 'view', 'permission_policy', {})
      .pipe(
        Effect.flatMap((allowed) =>
          allowed
            ? Effect.succeed(void 0)
            : Effect.fail(new ForbiddenException()),
        ),
      );
  }
}
