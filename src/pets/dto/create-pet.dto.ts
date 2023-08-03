import { IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { ManyToOne } from 'typeorm';

export class CreatePetDto {
  @IsString()
  name: string;

  @ManyToOne(() => User, (user) => user.pets)
  owner: User;
}
