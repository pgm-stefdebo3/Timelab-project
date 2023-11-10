import { Injectable } from '@nestjs/common';
import { CreateIconInput } from './dto/create-icon.input';
import { UpdateIconInput } from './dto/update-icon.input';
import { Icon } from './entities/icon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IconService {
  constructor(
    @InjectRepository(Icon)
    private iconRepository: Repository<Icon>,
  ) {}

  //   CREATE

  create(createTimestampInput: CreateIconInput): Promise<Icon> {
    const newTimestamp = this.iconRepository.create(createTimestampInput);
    return this.iconRepository.save(newTimestamp);
  }

  //   READ

  findAll(): Promise<Icon[]> {
    return this.iconRepository.find();
  }

  findOne(id: number): Promise<Icon> {
    return this.iconRepository.findOne({
      where: { id },
    });
  }

  //   UPDATE

  update(id: number, updateTimestampInput: UpdateIconInput) {
    let oldIcon = this.iconRepository.findOne({
      where: { id },
    });

    return this.iconRepository.save({...oldIcon, ...updateTimestampInput});
  }

  //   DELETE

  remove(id: number) {
    return this.iconRepository.delete(id);
  }
}
