import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Layer } from './entities/layer.entity';
import { CreateLayerInput } from './dto/create-layer.input';

@Injectable()
export class LayerService {
  constructor(
    @InjectRepository(Layer)
    private layerRepository: Repository<Layer>,
  ) {}

  //   CREATE

  create(createLayerInput: CreateLayerInput): Promise<Layer> {
    const newLayer = this.layerRepository.create(createLayerInput);
    return this.layerRepository.save(newLayer);
  }

  //   READ

  findAll(): Promise<Layer[]> {
    return this.layerRepository.find({ relations: ['markers'] });
  }

  findOne(id: number): Promise<Layer> {
    return this.layerRepository.findOne({
      where: { id },
      relations: ['markers'],
    });
  }

  //   UPDATE

  // update(id: number, updateLayerInput: UpdateLayerInput) {
  //   return `This action updates a #${id} category`;
  // }

  //   DELETE

  remove(id: number) {
    return this.layerRepository.delete(id);
  }
}
