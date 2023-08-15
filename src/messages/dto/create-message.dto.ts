import { IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Room } from '../../rooms/entities/room.entity';

export class CreateMessageDto {
  @IsString()
  name: string;

  @IsString()
  text: string;

  user: User;

  room: Room;
}
