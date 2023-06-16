import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { TimestampService } from './timestamp.service';
import { Timestamp } from './entities/timestamp.entity';
import { CreateTimestampInput } from './dto/create-timestamp.input';
import { UpdateTimestampInput } from './dto/update-timestamp.input';
import { Marker } from 'src/marker/entities/marker.entity';

@Resolver(() => Timestamp)
export class TimestampResolver {
  constructor(private readonly timestampService: TimestampService) {}

  @Mutation(() => Timestamp)
  createTimestamp(@Args('createTimestampInput') createTimestampInput: CreateTimestampInput) {
    return this.timestampService.create(createTimestampInput);
  }

  @Query(() => [Timestamp], { name: 'timestamps' })
  findAll() {
    return this.timestampService.findAll();
  }

  @Query(() => Timestamp, { name: 'timestamp' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.timestampService.findOne(id);
  }

  @ResolveField(() => Marker)
  marker(@Parent() timestamp: Timestamp): Promise<Marker> {
    return this.timestampService.getMarker(timestamp.markerId);
  }

  @Mutation(() => Timestamp)
  updateTimestamp(@Args('updateTimestampInput') updateTimestampInput: UpdateTimestampInput) {
    return this.timestampService.update(updateTimestampInput.id, updateTimestampInput);
  }

  @Mutation(() => Timestamp)
  removeTimestamp(@Args('id', { type: () => Int }) id: number) {
    return this.timestampService.remove(id);
  }
}
