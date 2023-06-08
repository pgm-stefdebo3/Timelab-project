import { InputType, Int, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateTimestampInput {

  @Column()
  @Field()
  type: string;

  // variables per type (all nullable)
  @Column({nullable: true})
  @Field({nullable: true})
  description?: string;

  @Column({nullable: true})
  @Field({nullable: true})
  fileName?: string;

  // //   Markers M-1

  @Column()
  @Field(() => Int)
  markerId: number;
}
