import { IsNotEmpty, IsOptional } from 'class-validator';
import { Pet } from 'src/pets/entities/pet.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Pet, (pet) => pet.owner)
  pets: Pet[];
}
