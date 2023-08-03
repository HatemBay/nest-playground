import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from './entities/pet.entity';
import { UpdatePetDto } from './dto/update-pet.dtp';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  async create(@Body() createPetDto: CreatePetDto): Promise<Pet> {
    return await this.petsService.createPet(createPetDto);
  }

  @Get()
  async findAll(): Promise<Pet[]> {
    return await this.petsService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Pet> {
    return await this.petsService.findOneById(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<Pet> {
    return await this.petsService.updatePet(+id, updatePetDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Pet> {
    return await this.petsService.removePet(+id);
  }
}