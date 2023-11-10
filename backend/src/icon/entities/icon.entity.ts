import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Marker } from 'src/marker/entities/marker.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
@InputType('IconInput')
@ObjectType()
export class Icon {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  fileName: string;
}
