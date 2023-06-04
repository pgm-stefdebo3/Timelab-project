import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  //   CREATE

  create(createUserInput: CreateUserInput): Promise<User> {
    const newOwner = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(newOwner);
  }

  //   READ

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['cart', 'reviews', 'wishlist', 'pastPurchases'],
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['cart', 'reviews', 'wishlist', 'pastPurchases'],
    });
  }

  //   UPDATE

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  //   DELETE

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
