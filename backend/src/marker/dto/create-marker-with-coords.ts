import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateMarkerWithCoordsInput {

  @Field({ nullable: true })
  type?: string;

  // Properties

  @Field(() => [[Float, Float]])
  coords: [number, number][];

  @Field()
  name: string;

  @Field()
  createdAt: Date;
  
  @Field({nullable: true})
  author?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  color?: string;

  // //   Icon M-1

  @Field({ nullable: true })
  iconId?: number;

  // //   Layer M-1

  @Field(() => Int)
  layerId: number;
}
