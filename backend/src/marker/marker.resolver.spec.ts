import { Test, TestingModule } from '@nestjs/testing';
import { MarkerResolver } from './marker.resolver';
import { MarkerService } from './marker.service';

describe('MarkerResolver', () => {
  let resolver: MarkerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarkerResolver, MarkerService],
    }).compile();

    resolver = module.get<MarkerResolver>(MarkerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
