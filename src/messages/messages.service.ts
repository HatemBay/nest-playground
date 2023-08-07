import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService extends TypeOrmCrudService<Message> {
  clientToUser = [];
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
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
    // TODO: improve
    const newMessage = this.messagesRepository.create(createMessageDto);

    return await this.messagesRepository.save(newMessage);
  }

  async findAll(): Promise<Message[]> {
    return await this.messagesRepository.find({ relations: ['user'] });
  }
}
