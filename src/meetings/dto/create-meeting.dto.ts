import { Employee } from 'src/employees/entities/employee.entity';

export class CreateMeetingDto {
  zoomUrl: string;
  attendees: Employee[];
}
