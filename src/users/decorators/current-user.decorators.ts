import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { request } from 'http';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
