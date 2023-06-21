import {
  ObjectType,
  Field,
  Int,
  InputType,
  Float,
} from '@nestjs/graphql';
import { Marker } from 'src/marker/entities/marker.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@InputType('CoordinateInput')
@ObjectType()
export class Coordinate {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column('decimal')
  @Field(() => Float)
  longitude: number;

  @Column('decimal')
  @Field(() => Float)
  latitude: number;

  // //   Markers M-1

  @Column()
  @Field(() => Int)
  markerId: number;

  @ManyToOne(() => Marker, (marker) => marker.coordinates)
  @Field(() => Marker)
  marker: Marker;
}