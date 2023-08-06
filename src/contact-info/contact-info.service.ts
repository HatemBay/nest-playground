import { Injectable } from '@nestjs/common';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactInfo } from './entities/contact-info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactInfoService {
  constructor(
    @InjectRepository(ContactInfo)
    private contactInfoRepository: Repository<ContactInfo>,
  ) {}

  async create(
    createContactInfoDto: CreateContactInfoDto,
  ): Promise<ContactInfo> {
    const newContactInfo =
      this.contactInfoRepository.create(createContactInfoDto);

    return await this.contactInfoRepository.save(newContactInfo);
  }

  async findAll(): Promise<ContactInfo[]> {
    return this.contactInfoRepository.find();
  }

  async findOne(id: number): Promise<ContactInfo> {
    try {
      const contactInfo = await this.contactInfoRepository.findOneOrFail({
        where: { id: id },
      });
      return contactInfo;
    } catch (err) {
      throw err;
    }
  }

  async update(
    id: number,
    updateContactInfoDto: UpdateContactInfoDto,
  ): Promise<ContactInfo> {
    const contactInfo = await this.findOne(id);
    // TODO: uncomment the lines in this method code when other fields than id are added
    // if (contactInfo) {
    //   ({ employee: contactInfo.employee } = updateContactInfoDto);

    return await this.contactInfoRepository.save(contactInfo);
    // }
  }

  async remove(id: number): Promise<ContactInfo> {
    const contactInfo = await this.findOne(id);

    return await this.contactInfoRepository.remove(contactInfo);
  }
}
