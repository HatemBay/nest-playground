import { Test, TestingModule } from '@nestjs/testing';
import { ContactInfoController } from './contact-info.controller';
import { ContactInfoService } from './contact-info.service';

describe('ContactInfoController', () => {
  let controller: ContactInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactInfoController],
      providers: [ContactInfoService],
    }).compile();

    controller = module.get<ContactInfoController>(ContactInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
