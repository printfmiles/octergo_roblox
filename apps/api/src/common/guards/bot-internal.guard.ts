import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { env } from '../../config/env';

@Injectable()
export class BotInternalGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const secret = request.headers['x-bot-secret'];

    if (secret !== env.botInternalSecret) {
      throw new UnauthorizedException('Invalid bot secret');
    }

    return true;
  }
}
