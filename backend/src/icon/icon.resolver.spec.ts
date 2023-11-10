import { Test, TestingModule } from '@nestjs/testing';
import { IconResolver } from './icon.resolver';
import { IconService } from './icon.service';

describe('IconResolver', () => {
  let resolver: IconResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IconResolver, IconService],
    }).compile();

    resolver = module.get<IconResolver>(IconResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
