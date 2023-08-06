import {
  ObjectType,
  Field,
  Int,
  InputType,
  Float,
} from '@nestjs/graphql';
import { Coordinate } from 'src/coordinate/entities/coordinate.entity';
import { Layer } from 'src/layer/entities/layer.entity';
import { Timestamp } from 'src/timestamp/entities/timestamp.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@InputType('MarkerInput')
@ObjectType()

export class Marker {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  // Properties

  @Column()
  @Field()
  name?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  icon?: string;

 //   Layer M-1

  @Column()
  @Field(() => Int)
  layerId: number;

  @ManyToOne(() => Layer, (layer) => layer.markers, {
    onDelete: 'CASCADE',
  })
  @Field(() => Layer)
  layer: Layer;

 //   Coordinates 1-M
  @OneToMany(() => Coordinate, (coordinate) => coordinate.marker)
  @Field(() => [Coordinate], { nullable: true })
  coordinates?: Coordinate[];

  //   Articles 1-M

  @OneToMany(() => Timestamp, (timestamp) => timestamp.marker)
  @Field(() => [Timestamp], { nullable: true })
  timestamps?: Timestamp[];
}