import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

import { BaseRequestContextImpl } from './request-context';
import type { RequestContext } from './request-context.types';

export const requestContextFromRequest = (request: Request): RequestContext =>
  BaseRequestContextImpl.fromRequest(request);

export const ReqCtx = createParamDecorator((_data: unknown, ctx: ExecutionContext): RequestContext => {
  const request = ctx.switchToHttp().getRequest();
  return requestContextFromRequest(request);
});

export const makeMockRequestContext = (
  params?: Partial<Parameters<typeof BaseRequestContextImpl.from>[0]>
): RequestContext =>
  BaseRequestContextImpl.from({
    accountId: null,
    getLocale: () => 'en',
    profileId: null,
    ...params,
  });
