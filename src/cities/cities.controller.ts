import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { AuthGuard } from '@nestjs/passport';
import { City } from 'src/schemas/city.schema';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getCities(): Promise<City[]> {
    return this.citiesService.getCities();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  addCities(@Body('cities') cities: City[]) {
    return this.citiesService.addCities(cities);
  }
}
