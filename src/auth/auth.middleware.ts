import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Socket } from 'socket.io';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async use(socket: Socket, next: () => void) {
    try {
      const token = socket.handshake.headers.authorization; // Assuming token is in "Bearer <token>" format
      const decoded = this.jwtService.verify(token, { secret: 'SECRET' });
      // console.log('decoded.sub');
      // console.log(decoded.sub);

      // Assuming your user service has a method to find a user by their ID
      const user = await this.usersService.findOneById(decoded.sub);

      socket['user'] = user; // Attach the authenticated user to the socket (would normally be removed when authentication is implemented in the frontend :p)

      next();
    } catch (error) {
      // Handle authentication error
      socket.disconnect();
    }
  }
}
