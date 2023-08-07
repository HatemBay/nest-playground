import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { ContactInfo } from '../../contact-info/entities/contact-info.entity';
import { Meeting } from '../../meetings/entities/meeting.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Employee, (e) => e.directReports, { onDelete: 'SET NULL' })
  manager: Relation<Employee>;

  @OneToMany(() => Employee, (e) => e.manager)
  directReports: Relation<Employee[]>;

  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employee)
  contactInfo: Relation<ContactInfo>;

  @OneToMany(() => Task, (task) => task.employee)
  tasks: Relation<Task[]>;

  @ManyToMany(() => Meeting, (meeting) => meeting.attendees)
  @JoinTable()
  meetings: Relation<Meeting[]>;
}
