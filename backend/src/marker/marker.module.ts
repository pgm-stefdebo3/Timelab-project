import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marker } from './entities/marker.entity';
import { MarkerService } from './marker.service';
import { MarkerResolver } from './marker.resolver';
import { LayerModule } from 'src/layer/layer.module';
import { TimestampModule } from 'src/timestamp/timestamp.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Marker]),
    LayerModule,
    forwardRef(() => TimestampModule),
  ],
  exports: [MarkerService],
  providers: [MarkerResolver, MarkerService],
})
export class MarkerModule {}