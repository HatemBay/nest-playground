import { IsString } from 'class-validator';
import { CreatePetDto } from 'src/pets/dto/create-pet.dto';
import { Role } from 'src/roles/entities/role.entity';

export class CreateUserDto {
  @IsString()
  name?: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  pets: CreatePetDto[];

  // * if i use createRoleDto instead of role i wouldn't be able to update the user's role
  // * since request the role's id will be requested which won't be in the dto
  roles: Role[];
}
