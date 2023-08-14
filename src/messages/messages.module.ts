import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    AuthModule,
    UsersModule,
    JwtModule,
  ],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {
  // attach user to the socket context
  // configure(consumer: MiddlewareConsumer) {
  //   console.log("dddd");
  //   consumer.apply(AuthMiddleware).forRoutes(MessagesGateway);
  // }
}
