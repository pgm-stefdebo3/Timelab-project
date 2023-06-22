import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Marker } from 'src/marker/entities/marker.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
@InputType('TimestampInput')
@ObjectType()
export class Timestamp {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

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

  //   Markers M-1

  @Column()
  @Field(() => Int)
  markerId: number;

  @ManyToOne(() => Marker, (marker) => marker.timestamps, {
    onDelete: 'CASCADE',
  })
  @Field(() => Marker)
  marker: Marker;
}
