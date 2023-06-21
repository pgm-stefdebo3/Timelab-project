import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coordinate } from './entities/coordinate.entity';
import { CoordinateService } from './coordinate.service';
import { CoordinateResolver } from './coordinate.resolver';
import { MarkerModule } from 'src/marker/marker.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coordinate]), 
    forwardRef(() => MarkerModule),
  ],
  exports: [CoordinateService],
  providers: [CoordinateResolver, CoordinateService],
})
export class CoordinateModule {}