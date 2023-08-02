
import { CoordinateService } from './../coordinate/coordinate.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateMarkerInput } from './dto/create-marker.input';
import { UpdateMarkerInput } from './dto/update-marker.input';
import { CreateMarkerWithCoordsInput } from './dto/create-marker-with-coords';
import { InjectRepository } from '@nestjs/typeorm';
import { Marker } from './entities/marker.entity';
import { Repository } from 'typeorm';
import { LayerService } from 'src/layer/layer.service';
import { Layer } from 'src/layer/entities/layer.entity';
import { Coordinate } from 'src/coordinate/entities/coordinate.entity';
import { TimestampService } from 'src/timestamp/timestamp.service';

@Injectable()
export class MarkerService {
  constructor(
    @InjectRepository(Marker)
    private markerRepository: Repository<Marker>,
    @Inject(forwardRef(() => LayerService))
    private layerService: LayerService,
    @Inject(forwardRef(() => CoordinateService))
    private coordinateService: CoordinateService,
  ) {}

  //   CREATE

  create(createMarkerInput: CreateMarkerInput): Promise<Marker> {
    const newMarker = this.markerRepository.create(createMarkerInput);
    return this.markerRepository.save(newMarker);
  }

  createMany(createMarkerInputs: CreateMarkerInput[]): Promise<Marker[]> {
    let markers = this.markerRepository.create(createMarkerInputs);
    return this.markerRepository.save(markers);
  }

  createManyWithCoords(createMarkerWithCoordsInputs: CreateMarkerWithCoordsInput[]): Promise<Marker[]> {
    createMarkerWithCoordsInputs.map(async (createMarkerWithCoordsInput) => {
      const newMarker = await this.create(createMarkerWithCoordsInput);
      const marker = await this.findOne(newMarker.id);
      createMarkerWithCoordsInput.coords.forEach((coord) => {
        this.coordinateService.create({latitude: coord[0], longitude: coord[1], markerId: marker.id })
      })
    })
    return this.findAllWithLayerId(createMarkerWithCoordsInputs[0].layerId);
  }

  //   READ

  findAll(): Promise<Marker[]> {
    return this.markerRepository.find({ relations: ['layer', 'coordinates'] });
  }

  findAllWithLayerId(layerId: number): Promise<Marker[]> {
    return this.markerRepository.find({ relations: ['layer', 'coordinates'], where: {layerId} });
  }

  findOne(id: number): Promise<Marker> {
    return this.markerRepository.findOne({
      where: { id },
      relations: ['layer', 'coordinates'],
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
