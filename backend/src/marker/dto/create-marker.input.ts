import { InputType, Int, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateMarkerInput {
  
  @Field({ nullable: true })
  type?: string;

  // Properties

  @Field()
  name?: string;

  @Field()
  createdAt: Date;
  
  @Field({nullable: true})
  author?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  attribution?: string;

  @Field(() => Boolean, { nullable: true })
  draggable?: Boolean;

  @Field({ nullable: true })
  icon?: string;

  // //   Layer M-1

  @Field(() => Int)
  layerId: number;
}
