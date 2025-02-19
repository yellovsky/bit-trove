// global modules
import { Effect } from 'effect';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Delete,
  Get,
  Inject,
  LoggerService,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';

// common modules
import { Account } from 'src/decorators/account.decorator';
import { ApiCommonErrorResponses } from 'src/utils/swagger';
import type { DBAccount } from 'src/modules/account';
import { RuntimeService } from 'src/modules/runtime';

// local modules
import { FindManyPermissionsDTO } from '../dto/find-many-permission-polices.dto';
import { PermissionPolicyAccessService } from '../services/permission-policy-access.service';
import { PermissionPolicyListResponseEntity } from '../entities/permission-policy-list-response.entity';
import { PermissionPolicyResponseEntity } from '../entities/permission-policy-response.entity';
import { PermissionPolicySerializerService } from '../services/permission-policy-serializer.service';
import { PermissionPolicyService } from '../services/permission-policy.service';
import { StatusSuccessResponseEntity } from '../../../common/entities/status-success';

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
  ) {}

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

        const founded = yield* this.permissionPolicySrv.getOne(null, id);

        if (
          !(yield* this.permissionPolicyAccessSrv.canReadCMS(account, founded))
        ) {
          return yield* Effect.fail(new NotFoundException());
        }

        const serialized =
          yield* this.permissionPolicySerializerSrv.serialize(founded);

        return new PermissionPolicyResponseEntity({
          data: serialized,
        });
      });

    return this.runtimeSrv.runPromise(program);
  }

  @Get()
  @ApiOperation({ description: 'Get permissions list' })
  @ApiOkResponse({ type: PermissionPolicyListResponseEntity })
  @ApiCommonErrorResponses('bad_request', 'forbidden', 'unauthorized')
  async getList(
    @Query() query: FindManyPermissionsDTO,
    @Account() account: DBAccount,
  ): Promise<PermissionPolicyListResponseEntity> {
    const program: Effect.Effect<PermissionPolicyListResponseEntity, Error> =
      Effect.gen(this, function* () {
        this.logger.debug?.(
          `query: ${JSON.stringify(query)}`,
          `${CMSPermissionPoliciesV1Controller.name}.getList`,
        );

        const [founded, total] = yield* Effect.all([
          this.permissionPolicySrv.getMany(null, query),
          this.permissionPolicySrv.getTotal(null, query),
        ]);
        const accessChecked =
          yield* this.permissionPolicyAccessSrv.canReadCMSFilter(
            account,
            founded,
          );

        const serialized =
          yield* this.permissionPolicySerializerSrv.serializeList(
            accessChecked,
          );

        return new PermissionPolicyListResponseEntity({
          data: serialized,
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

        const founded = yield* this.permissionPolicySrv.getOne(null, id);

        if (
          !(yield* this.permissionPolicyAccessSrv.canReadCMS(account, founded))
        ) {
          return yield* Effect.fail(new NotFoundException());
        }

        yield* this.permissionPolicySrv.deleteOne(null, id);

        return new StatusSuccessResponseEntity();
      });

    return this.runtimeSrv.runPromise(program);
  }
}
