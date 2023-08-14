import { IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Message } from '../../messages/entities/message.entity';

export class CreateRoomDto {
  @IsString()
  name: string;

  users: User[];

  messages: Message[];
}
