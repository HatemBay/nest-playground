import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private userService: UsersService, private jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const bearerToken = context.getArgs()[0].handshake.headers.authorization;

    try {
      const decoded = this.jwt.verify(bearerToken, { secret: 'SECRET' }) as any;
      return new Promise(async (resolve, reject) => {
        return await this.userService
          .findOneByUserName(decoded.username)
          .then((user) => {
            if (user) {
              // console.log('usr found');
              // console.log(user);

              resolve(true);
            } else {
              // console.log('usr nn found');
              reject(false);
            }
          });
      });
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
