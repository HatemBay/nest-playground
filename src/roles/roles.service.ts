import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = this.rolesRepository.create(createRoleDto);

    return await this.rolesRepository.save(newRole);
  }

  async findAll(): Promise<Role[]> {
    return this.rolesRepository.find({ relations: ['users'] });
  }

  async findOne(id: number): Promise<Role> {
    try {
      return await this.rolesRepository.findOneOrFail({
        where: { id: id },
        relations: ['users'],
      });
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);
    if (role) {
      role.name = updateRoleDto.name;

      return await this.rolesRepository.save(role);
    }
  }

  async remove(id: number): Promise<Role> {
    const role = await this.findOne(id);

    return await this.rolesRepository.remove(role);
  }
}
