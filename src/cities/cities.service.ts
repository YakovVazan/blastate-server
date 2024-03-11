import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City } from 'src/schemas/city.schema';

@Injectable()
export class CitiesService {
  constructor(@InjectModel(City.name) private cityModel: Model<City>) {}

  getCities(): Promise<City[]> {
    return this.cityModel.find().exec();
  }

  async addCities(cities: City[]): Promise<void> {
    await this.cityModel.insertMany(cities);
  }
}
