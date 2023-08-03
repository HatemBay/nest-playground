import { Test, TestingModule } from '@nestjs/testing';
import { ContactInfoService } from './contact-info.service';

describe('ContactInfoService', () => {
  let service: ContactInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactInfoService],
    }).compile();

    service = module.get<ContactInfoService>(ContactInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
