import { InputType, Int, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateTimestampInput {

  @Field()
  type: string;

  // variables per type (all nullable)
  @Field({nullable: true})
  description?: string;
  
  @Field({nullable: true})
  author?: string;

  @Field({nullable: true})
  fileName?: string;

  // //   Markers M-1

  @Field(() => Int)
  markerId: number;
}
