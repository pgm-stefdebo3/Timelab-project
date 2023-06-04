import { CreateMarkerInput } from './create-marker.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMarkerInput extends PartialType(CreateMarkerInput) {
  @Field(() => Int)
  id: number;
}
