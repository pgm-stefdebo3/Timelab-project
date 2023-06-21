import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateMarkerWithCoordsInput {
  @Field()
  type: string;

  // Properties

  @Field(() => [[Float, Float]])
  coords: [number, number][];

  @Field()
  name: string;

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
