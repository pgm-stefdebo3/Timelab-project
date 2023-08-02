import { CreateCoordinateInput } from './create-coordinate.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCoordinateInput extends PartialType(CreateCoordinateInput) {
  @Field(() => Int)
  id: number;
}
