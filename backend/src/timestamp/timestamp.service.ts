import { Injectable } from '@nestjs/common';
import { CreateTimestampInput } from './dto/create-timestamp.input';
import { UpdateTimestampInput } from './dto/update-timestamp.input';

@Injectable()
export class TimestampService {
  create(createTimestampInput: CreateTimestampInput) {
    return 'This action adds a new timestamp';
  }

  findAll() {
    return `This action returns all timestamp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timestamp`;
  }

  update(id: number, updateTimestampInput: UpdateTimestampInput) {
    return `This action updates a #${id} timestamp`;
  }

  remove(id: number) {
    return `This action removes a #${id} timestamp`;
  }
}
