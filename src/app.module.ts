import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjasModule } from './ninjas/ninjas.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsModule } from './pets/pets.module';
import { EmployeesModule } from './employees/employees.module';
import { MeetingsModule } from './meetings/meetings.module';
import { TasksModule } from './tasks/tasks.module';
import { ContactInfoModule } from './contact-info/contact-info.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AbilityModule } from './ability/ability.module';
import { RolesModule } from './roles/roles.module';
import { MessagesModule } from './messages/messages.module';
import config from './ormconfig';
import { AbilityGuard } from './ability/ability.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    EventEmitterModule.forRoot(),
    NinjasModule,
    UsersModule,
    AuthModule,
    PetsModule,
    EmployeesModule,
    MeetingsModule,
    TasksModule,
    ContactInfoModule,
    AbilityModule,
    RolesModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AbilityGuard,
    },
  ],
})
export class AppModule {}
