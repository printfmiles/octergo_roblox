import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from '../../config/env';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwt = new JwtService({ secret: env.jwtAccessSecret });

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    try {
      request.user = this.jwt.verify(authHeader.slice(7));
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
