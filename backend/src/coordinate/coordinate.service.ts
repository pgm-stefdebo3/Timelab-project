import { MarkerService } from './../marker/marker.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateCoordinateInput } from './dto/create-coordinate.input';
import { UpdateCoordinateInput } from './dto/update-coordinate.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Marker } from 'src/marker/entities/marker.entity';
import { Repository } from 'typeorm';
import { LayerService } from 'src/layer/layer.service';
import { Coordinate } from './entities/coordinate.entity';

@Injectable()
export class CoordinateService {
  constructor(
    @InjectRepository(Coordinate)
    private coordinateRepository: Repository<Coordinate>,
    @Inject(forwardRef(() => MarkerService))
    private markerService: MarkerService,
  ) {}

  //   CREATE

  create(createCoordinateInput: CreateCoordinateInput): Promise<Coordinate> {
    const newCoordinate = this.coordinateRepository.create(createCoordinateInput);
    return this.coordinateRepository.save(newCoordinate);
  }

  //   READ

  findAll(): Promise<Coordinate[]> {
    return this.coordinateRepository.find({ relations: ['marker'] });
  }

  findOne(id: number): Promise<Coordinate> {
    return this.coordinateRepository.findOne({
      where: { id },
      relations: ['marker'],
    });
  }

  getMarker(markerId: number): Promise<Marker> {
    return this.markerService.findOne(markerId);
  }

  //   UPDATE

  update(id: number, updateCoordinateInput: UpdateCoordinateInput) {
    return `This action updates a #${id} coordinate`;
  }

  //   DELETE

  remove(id: number) {
    return this.coordinateRepository.delete(id);
  }
}
