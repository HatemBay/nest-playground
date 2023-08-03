import { Module } from '@nestjs/common';
import { NinjasController } from './ninjas.controller';
import { NinjasService } from './ninjas.service';
import { CreateNinjaDto } from './dto/create-ninja.dto';

@Module({
  controllers: [NinjasController],
  providers: [NinjasService],
})
export class NinjasModule {
  // public getNinjas(weapon?: 'stars' | 'nunchucks'): CreateNinjaDto;
  // public getNinja(id: string);
}
