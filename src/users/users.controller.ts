import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AbilityFactory } from 'src/ability/ability.factory/ability.factory';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private abilityFactory: AbilityFactory,
  ) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Request() req,
  ): Promise<User> {
    const user = req.user;
    // const ability = this.abilityFactory.defineAbility(user);
    console.log(user);

    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get('id/:id')
  async findOneById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOneById(+id);
  }

  @Get('username/:username')
  async findOneByUserName(@Param('username') username: string): Promise<User> {
    return await this.usersService.findOneByUserName(username);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return await this.usersService.removeUser(+id);
  }
}
