import { Test, TestingModule } from '@nestjs/testing';
import { CoordinateResolver } from './coordinate.resolver';
import { CoordinateService } from './coordinate.service';

describe('CoordinateResolver', () => {
  let resolver: CoordinateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoordinateResolver, CoordinateService],
    }).compile();

    resolver = module.get<CoordinateResolver>(CoordinateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
