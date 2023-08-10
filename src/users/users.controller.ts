import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ForbiddenError } from '@casl/ability';
import { CheckAbilities } from '../ability/ability.decorator';
import { Action } from '../ability/ability.factory/ability.factory';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req,
  ): Promise<User> {
    const user = req.user;
    try {
      return await this.usersService.createUser(createUserDto, user);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  @CheckAbilities({ action: Action.Read, subject: User })
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @CheckAbilities({ action: Action.Read, subject: User })
  @Get('id/:id')
  async findOneById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOneById(+id);
  }

  @CheckAbilities({ action: Action.Read, subject: User })
  @Get('username/:username')
  async findOneByUserName(@Param('username') username: string): Promise<User> {
    return await this.usersService.findOneByUserName(username);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ): Promise<User> {
    const user = req.user;
    // * if we use an exception filter this piece of code becomes cleaner than the one above, and we won't need the
    // * try catch cuz the filter will handle the error
    try {
      return await this.usersService.updateUser(+id, updateUserDto, user);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: User })
  async remove(@Param('id') id: string): Promise<User> {
    return await this.usersService.removeUser(+id);
  }
}
