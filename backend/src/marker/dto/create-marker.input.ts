import { InputType, Int, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateMarkerInput {
  @Field()
  type: string;

  // Properties

  @Column()
  @Field()
  name?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  attribution?: string;

  @Column({ nullable: true })
  @Field(() => Boolean, { nullable: true })
  draggable?: Boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  icon?: string;

  // //   Layer M-1

  @Column()
  @Field(() => Int)
  layerId: number;
}
