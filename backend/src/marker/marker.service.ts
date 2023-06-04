import { CoordinateService } from './../coordinate/coordinate.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateMarkerInput } from './dto/create-marker.input';
import { UpdateMarkerInput } from './dto/update-marker.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Marker } from './entities/marker.entity';
import { Repository } from 'typeorm';
import { LayerService } from 'src/layer/layer.service';
import { Layer } from 'src/layer/entities/layer.entity';
import { Coordinate } from 'src/coordinate/entities/coordinate.entity';

@Injectable()
export class MarkerService {
  constructor(
    @InjectRepository(Marker)
    private markerRepository: Repository<Marker>,
    @Inject(forwardRef(() => LayerService))
    private layerService: LayerService,
  ) {}

  //   CREATE

  create(createMarkerInput: CreateMarkerInput): Promise<Marker> {
    const newMarker = this.markerRepository.create(createMarkerInput);
    return this.markerRepository.save(newMarker);
  }

  //   READ

  findAll(): Promise<Marker[]> {
    return this.markerRepository.find({ relations: ['layer', 'markers'] });
  }

  findOne(id: number): Promise<Marker> {
    return this.markerRepository.findOne({
      where: { id },
      relations: ['layer', 'markers'],
    });
  }

  getLayer(layerId: number): Promise<Layer> {
    return this.layerService.findOne(layerId);
  }

  //   UPDATE

  update(id: number, updateMarkerInput: UpdateMarkerInput) {
    return `This action updates a #${id} marker`;
  }

  //   DELETE

  remove(id: number) {
    return this.markerRepository.delete(id);
  }
}
