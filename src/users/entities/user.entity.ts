import { IsNotEmpty, IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Pet } from '../../pets/entities/pet.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  orgId: number;

  @OneToMany(() => Pet, (pet) => pet.owner)
  pets: Relation<Pet[]>;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Relation<Role[]>;
}
