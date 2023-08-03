import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { OnEvent } from '@nestjs/event-emitter';

// export type User = {
//   id: number;
//   name: string;
//   username: string;
//   password: string;
// };

@Injectable()
export class UsersService {
  // private readonly users: User[] = [
  //   {
  //     id: 1,
  //     name: 'Hatem',
  //     username: 'hatem',
  //     password: 'slmslm',
  //   },
  //   {
  //     id: 2,
  //     name: 'Bayoudh',
  //     username: 'bay',
  //     password: 'ssssss',
  //   },
  // ];

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['pets'] });
  }

  async findOneById(id: number): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({
        where: { id: id },
        relations: ['pets'],
      });
    } catch (err) {
      throw err;
    }
  }

  // @OnEvent('findOneByUserName', { async: true })
  async findOneByUserName2({ username }: { username: string }): Promise<User> {
    console.log('1. slmslm');

    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { username: username },
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  @OnEvent('user.found', { async: true })
  doSomething() {
    console.log('2. slmslm');
    return 1;
  }

  async findOneByUserName(username): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { username: username },
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    if (user) {
      if (updateUserDto.name) {
        user.name = updateUserDto.name;
      }
      user.username = updateUserDto.username;
      if (updateUserDto.password) {
        user.password = updateUserDto.password;
      }

      return await this.usersRepository.save(user);
    }
  }

  async removeUser(id: number): Promise<User> {
    const user = await this.findOneById(id);

    return await this.usersRepository.remove(user);
  }
}
