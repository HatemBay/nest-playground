import { Employee } from '../../employees/entities/employee.entity';

export class CreateMeetingDto {
  zoomUrl: string;
  attendees: Employee[];
}
