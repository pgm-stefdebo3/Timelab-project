import { Module } from '@nestjs/common';
import { TimestampService } from './timestamp.service';
import { TimestampResolver } from './timestamp.resolver';

@Module({
  providers: [TimestampResolver, TimestampService]
})
export class TimestampModule {}
