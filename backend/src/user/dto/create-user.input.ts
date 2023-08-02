import { InputType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Column()
  @Field()
  @IsEmail()
  email: string;

  @Column()
  @Field()
  @MinLength(7)
  password: string;
}
