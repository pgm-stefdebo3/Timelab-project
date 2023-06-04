import { CreateTimestampInput } from './create-timestamp.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTimestampInput extends PartialType(CreateTimestampInput) {
  @Field(() => Int)
  id: number;
}
