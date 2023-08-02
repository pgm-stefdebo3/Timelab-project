import { Test, TestingModule } from '@nestjs/testing';
import { LayerResolver } from './layer.resolver';
import { LayerService } from './layer.service';

describe('LayerResolver', () => {
  let resolver: LayerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LayerResolver, LayerService],
    }).compile();

    resolver = module.get<LayerResolver>(LayerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
