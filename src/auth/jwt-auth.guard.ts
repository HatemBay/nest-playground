import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    console.log('canact');
    const skipAuth =
      this.reflector.get<boolean>('skipAuth', context.getHandler()) || false;

    if (skipAuth) {
      return true;
    }

    return super.canActivate(context);
  }
}
