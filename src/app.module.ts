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
import config from 'ormconfig';
import { ContactInfoModule } from './contact-info/contact-info.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
