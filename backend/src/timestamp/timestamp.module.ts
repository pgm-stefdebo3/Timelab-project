import { Module, forwardRef } from '@nestjs/common';
import { TimestampService } from './timestamp.service';
import { TimestampResolver } from './timestamp.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timestamp } from './entities/timestamp.entity';
import { MarkerModule } from 'src/marker/marker.module';

@Module({
  imports: [
  TypeOrmModule.forFeature([Timestamp]),
  forwardRef(() => MarkerModule),
],
  exports: [TimestampService],
  providers: [TimestampResolver, TimestampService],
})

export class TimestampModule {}
