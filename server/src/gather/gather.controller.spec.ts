import { Test, TestingModule } from '@nestjs/testing';
import { GatherController } from './gather.controller';
import { GatherService } from './gather.service';

describe('GatherController', () => {
  let controller: GatherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatherController],
      providers: [GatherService],
    }).compile();

    controller = module.get<GatherController>(GatherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
