import { Injectable } from '@nestjs/common';
import { Heatmap } from './heatmap';
import { points } from './points';

@Injectable()
export class HeatmapService {
  getHeatmapByCity(city: string): Heatmap {
    return points[city] || [];
  }
}
