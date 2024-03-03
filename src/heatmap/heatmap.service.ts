import { Injectable } from '@nestjs/common';
import { CreateHeatmapDto } from './dto/create-heatmap.dto';
import { UpdateHeatmapDto } from './dto/update-heatmap.dto';

@Injectable()
export class HeatmapService {
  create(createHeatmapDto: CreateHeatmapDto) {
    return 'This action adds a new heatmap';
  }

  findAll() {
    return `This action returns all heatmap`;
  }

  findOne(id: number) {
    return `This action returns a #${id} heatmap`;
  }

  update(id: number, updateHeatmapDto: UpdateHeatmapDto) {
    return `This action updates a #${id} heatmap`;
  }

  remove(id: number) {
    return `This action removes a #${id} heatmap`;
  }
}
