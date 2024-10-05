import { Test, TestingModule } from '@nestjs/testing';
import { GatherService } from './gather.service';

describe('GatherService', () => {
  let service: GatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GatherService],
    }).compile();

    service = module.get<GatherService>(GatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
