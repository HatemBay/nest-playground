import { ContactInfo } from 'src/contact-info/entities/contact-info.entity';
import { Meeting } from 'src/meetings/entities/meeting.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Employee } from '../entities/employee.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  manager: Employee;

  directReports: Employee[];

  contactInfo: ContactInfo;

  tasks: Task[];

  meetings: Meeting[];
}
