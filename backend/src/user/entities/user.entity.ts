import {
  ObjectType,
  Field,
  Int,
  InputType,
} from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
// Got this method from Dion during class ('most secure method for password hashing')
import * as bcrypt from 'bcrypt';

@Entity()
@InputType('UserInput')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ unique: true })
  @Field()
  @IsEmail()
  email: string;

  @Column()
  @Field()
  @MinLength(7)
  password: string;
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
