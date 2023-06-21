import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marker } from './entities/marker.entity';
import { MarkerService } from './marker.service';
import { MarkerResolver } from './marker.resolver';
import { LayerModule } from 'src/layer/layer.module';
import { TimestampModule } from 'src/timestamp/timestamp.module';
import { CoordinateModule } from 'src/coordinate/coordinate.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Marker]),
    LayerModule,
    forwardRef(() => TimestampModule),
    forwardRef(() => CoordinateModule),
  ],
  exports: [MarkerService],
  providers: [MarkerResolver, MarkerService],
})
export class MarkerModule {}