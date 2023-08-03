import { ApiProperty } from '@nestjs/swagger';
import { CreateContactInfoDto } from 'src/contact-info/dto/create-contact-info.dto';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { CreateMeetingDto } from 'src/meetings/dto/create-meeting.dto';

export class CreateEmployeeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  manager: CreateEmployeeDto;

  directReports: CreateEmployeeDto[];

  contactInfo: CreateContactInfoDto;

  tasks: CreateTaskDto[];

  meetings: CreateMeetingDto[];
}
