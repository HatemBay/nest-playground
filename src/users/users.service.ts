import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { ForbiddenError } from '@casl/ability';
import {
  AbilityFactory,
  Action,
} from '../ability/ability.factory/ability.factory';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

// export type User = {
//   id: number;
//   name: string;
//   username: string;
//   password: string;
// };

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private abilityFactory: AbilityFactory,
  ) {
    super(usersRepository);
  }

  async createUser(
    createUserDto: CreateUserDto,
    currentUser: User,
  ): Promise<User> {
    const ability = this.abilityFactory.defineAbility(currentUser);

    const newUser = this.usersRepository.create(createUserDto);

    // * if we don't specify cannot() and because('') in the factory we instead use .SetMessage('') after .from()
    ForbiddenError.from(ability).throwUnlessCan(Action.Create, newUser);
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['pets', 'roles'] });
  }

  async findOneById(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { id: id },
        relations: ['pets', 'roles'],
      });
      return user;
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
        relations: ['roles', 'pets'],
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
        relations: ['roles', 'pets'],
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
    currentUser: User,
  ): Promise<User> {
    const ability = this.abilityFactory.defineAbility(currentUser);

    const userToUpdate = await this.findOneById(id);
    if (userToUpdate) {
      ForbiddenError.from(ability).throwUnlessCan(Action.Update, userToUpdate);

      return await this.usersRepository.save({
        ...userToUpdate,
        ...updateUserDto,
      });
    }
  }

  async removeUser(id: number): Promise<User> {
    const user = await this.findOneById(id);

    return await this.usersRepository.remove(user);
  }
}
