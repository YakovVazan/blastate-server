import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HeatmapService } from './heatmap.service';

@Controller('heatmap')
export class HeatmapController {
  constructor(private heatmapService: HeatmapService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getHeatmap(@Body('city') city) {
    if (!city)
      throw new HttpException('City is required', HttpStatus.BAD_REQUEST);

    return this.heatmapService.getHeatmapByCity(city);
  }
}
