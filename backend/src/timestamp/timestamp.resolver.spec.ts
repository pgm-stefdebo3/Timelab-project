import { Test, TestingModule } from '@nestjs/testing';
import { TimestampResolver } from './timestamp.resolver';
import { TimestampService } from './timestamp.service';

describe('TimestampResolver', () => {
  let resolver: TimestampResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimestampResolver, TimestampService],
    }).compile();

    resolver = module.get<TimestampResolver>(TimestampResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
