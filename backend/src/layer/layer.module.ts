import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LayerService } from './layer.service';
import { LayerResolver } from './layer.resolver';
import { Layer } from './entities/layer.entity';
import { DateScalar } from 'src/scalar-date/scalar-date';

@Module({
  imports: [TypeOrmModule.forFeature([Layer])],
  exports: [LayerService],
  providers: [ LayerResolver, LayerService ],
})
export class LayerModule {}