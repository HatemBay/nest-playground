import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from './ability.factory/ability.factory';
import { CHECK_ABILITY, RequiredRule } from './ability.decorator';
import { ForbiddenError } from '@casl/ability';

@Injectable()
export class AbilityGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];

    const skipAuth =
      this.reflector.get<boolean>('skipAuth', context.getHandler()) || false;
    if (skipAuth) return true;

    const { user } = context.switchToHttp().getRequest();

    // * In case i somehow decided to put global ability guard first
    // if (!user) {
    //   throw new ForbiddenException('User not authenticated');
    // }

    const ability = this.caslAbilityFactory.defineAbility(user);
    try {
      rules.forEach((rule) =>
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),
      );
      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
    return true;
  }
}
