import { IsString } from 'class-validator';
import { Pet } from 'src/pets/entities/pet.entity';
import { OneToMany } from 'typeorm';

export class CreateUserDto {
  @IsString()
  name?: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @OneToMany(() => Pet, (pet) => pet.owner)
  pets: Pet[];
}
