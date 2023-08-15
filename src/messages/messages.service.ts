import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class MessagesService extends TypeOrmCrudService<Message> {
  clientToUser = [];
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
    private roomsService: RoomsService,
  ) {
    super(messagesRepository);
  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const newMessage = this.messagesRepository.create(createMessageDto);

    return await this.messagesRepository.save(newMessage);
  }

  async findAll(): Promise<Message[]> {
    return await this.messagesRepository.find({ relations: ['user', 'room'] });
  }

  async findByRoom(roomId: number): Promise<Message[]> {
    const currentRoom = await this.roomsService.findOneById(roomId);

    return await this.messagesRepository.find({
      relations: ['user', 'room'],
      where: { room: currentRoom },
    });
  }
}
