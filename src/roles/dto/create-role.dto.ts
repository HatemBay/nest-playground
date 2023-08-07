import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsString } from 'class-validator';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  name: string;

  users: CreateUserDto[];
}
