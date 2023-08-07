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
import config from './ormconfig';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
