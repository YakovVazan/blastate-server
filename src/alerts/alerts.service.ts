import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CitiesService } from 'src/cities/cities.service';
import { Alert } from 'src/schemas/alert.schema';
import { heatmapDetails } from 'src/interfaces/heatmapDetails.interface';

@Injectable()
export class AlertsService {
  constructor(
    @InjectModel(Alert.name) private alertModel: Model<Alert>,
    private citiesService: CitiesService,
  ) {}

  async getAlertsByCity(city: string): Promise<Alert[]> {
    return this.alertModel.find({ city }).exec();
  }

  async getAllAlerts(): Promise<heatmapDetails[]> {
    const aggregationPipeline = [
      { $group: { _id: '$city', count: { $sum: 1 } } },
    ];

    const result = await this.alertModel.aggregate(aggregationPipeline).exec();

    const latLng = await this.citiesService.getCities();
    const countsByCity: heatmapDetails[] = [];
    result.forEach((entry: { _id: string; count: number }) => {
      const city = latLng.find((city) => city.hebName === entry._id);

      (city?.lat || city?.lng) &&
        countsByCity.push({
          city: entry._id,
          alerts: entry.count,
          lat: city.lat,
          lng: city.lng,
        });
    });

    return countsByCity;
  }

  async getCountByCity(city: string): Promise<number> {
    return this.alertModel.countDocuments({ city });
  }

  async addAlerts(alerts: Alert[]): Promise<void> {
    await this.alertModel.insertMany(alerts);
  }
}
