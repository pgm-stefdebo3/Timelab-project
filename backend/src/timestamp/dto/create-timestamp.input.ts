import { InputType, Int, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateTimestampInput {
  @Field()
  type: string;

  // Nullable content types



  // //   Layer M-1

  @Field(() => Int)
  layerId: number;
}
