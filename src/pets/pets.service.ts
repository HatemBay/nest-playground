import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dtp';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { TaskCreatedEvent } from 'src/tasks/dto/task-created.event';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  async createPet(createPetDto: CreatePetDto): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetDto);

    return await this.petsRepository.save(newPet);
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find({ relations: ['owner'] });
  }

  async findOneById(id: number): Promise<Pet> {
    try {
      const pet = await this.petsRepository.findOneOrFail({
        where: { id: id },
      });
      return pet;
    } catch (err) {
      throw err;
    }
  }

  async findOneByPetName(name: string): Promise<Pet> {
    try {
      const pet = await this.petsRepository.findOneOrFail({
        where: { name: name },
      });
      return pet;
    } catch (err) {
      throw err;
    }
  }

  async updatePet(id: number, updatePetDto: UpdatePetDto): Promise<Pet> {
    const pet = await this.findOneById(id);
    if (pet) {
      pet.name = updatePetDto.name;

      return await this.petsRepository.save(pet);
    }
  }

  async removePet(id: number): Promise<Pet> {
    const pet = await this.findOneById(id);

    return await this.petsRepository.remove(pet);
  }

  // @OnEvent('task.launched', { async: true, promisify: false })
  @OnEvent('task.launched')
  async doSomething({ name }: TaskCreatedEvent): Promise<number> {
    console.log('slmsqdkjhqdsjgfdskql ' + name);
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(1);
    //   }, 100);
    // });
    return 1;
  }
}
