import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Room } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService extends TypeOrmCrudService<Room> {
  constructor(
    @InjectRepository(Room) private roomsRepository: Repository<Room>,
  ) {
    super(roomsRepository);
  }
  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const newRoom = this.roomsRepository.create(createRoomDto);

    return await this.roomsRepository.save(newRoom);
  }

  async findAll(): Promise<Room[]> {
    return this.roomsRepository.find({ relations: ['users'] });
  }

  async findOneById(id: number): Promise<Room> {
    try {
      const room = await this.roomsRepository.findOneOrFail({
        where: { id: id },
      });
      return room;
    } catch (err) {
      throw err;
    }
  }

  async findOneByName(name: string): Promise<Room> {
    try {
      const room = await this.roomsRepository.findOneOrFail({
        where: { name: name },
      });
      return room;
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.findOneById(id);
    if (room) {
      room.name = updateRoomDto.name;

      return await this.roomsRepository.save(room);
    }
  }

  async remove(id: number): Promise<Room> {
    const room = await this.findOneById(id);

    return await this.roomsRepository.remove(room);
  }
}
