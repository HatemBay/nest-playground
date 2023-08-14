import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.rooms)
  @JoinTable()
  users: Relation<User[]>;
}
