import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactInfoService } from './contact-info.service';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';

@Controller('contact-info')
export class ContactInfoController {
  constructor(private readonly contactInfoService: ContactInfoService) {}

  @Post()
  create(@Body() createContactInfoDto: CreateContactInfoDto) {
    return this.contactInfoService.create(createContactInfoDto);
  }

  @Get()
  findAll() {
    return this.contactInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactInfoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactInfoDto: UpdateContactInfoDto,
  ) {
    return this.contactInfoService.update(+id, updateContactInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactInfoService.remove(+id);
  }
}
