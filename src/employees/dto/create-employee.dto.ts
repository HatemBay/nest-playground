import { ApiProperty } from '@nestjs/swagger';
import { CreateContactInfoDto } from '../../contact-info/dto/create-contact-info.dto';
import { CreateMeetingDto } from '../../meetings/dto/create-meeting.dto';
import { CreateTaskDto } from '../../tasks/dto/create-task.dto';

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
