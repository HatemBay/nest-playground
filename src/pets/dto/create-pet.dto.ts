import { IsString } from 'class-validator';
import { ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export class CreatePetDto {
  @IsString()
  name: string;

  @ManyToOne(() => User, (user) => user.pets)
  owner: User;
}
