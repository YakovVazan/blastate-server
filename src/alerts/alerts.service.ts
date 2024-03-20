import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { CitiesService } from 'src/cities/cities.service';
import { Alert } from 'src/schemas/alert.schema';
import { heatmapDetails } from 'src/interfaces/heatmapDetails.interface';

@Injectable()
export class AlertsService {
  constructor(
    @InjectModel(Alert.name) private alertModel: Model<Alert>,
    private citiesService: CitiesService,
  ) {}

  async getAllAlerts(targetDate?: string): Promise<any> {
    const aggregationPipeline = [
      {
        $match: {
          date: targetDate ? targetDate.split('T')[0] : { $exists: true },
        },
      },
      {
        $group: {
          _id: '$city',
          count: { $sum: 1 },
        },
      },
    ];

    const result = await this.alertModel.aggregate(aggregationPipeline).exec();
    const latLng = await this.citiesService.getCities();
    const countsByCity: heatmapDetails[] = [];
    let sumAlerts: number = 0;

    result.forEach((entry: { _id: string; count: number }) => {
      const city = latLng.find((city) => entry._id.includes(city.hebName));

      if (city?.lat || city?.lng) {
        sumAlerts += entry.count;
        countsByCity.push({
          city: entry._id,
          alerts: entry.count,
          lat: city.lat,
          lng: city.lng,
        });
      }
    });

    return { countsByCity, sumAlerts };
  }

  async getAlertsPerCity(city: string, targetDate: string): Promise<number> {
    let query: FilterQuery<any> = {
      city: { $regex: new RegExp(city, 'i') },
    };

    if (targetDate !== '') {
      query = {
        ...query,
        date: targetDate,
      };
    }

    return await this.alertModel.countDocuments(query);
  }

  async addAlerts(alerts: Alert[]): Promise<void> {
    await this.alertModel.insertMany(alerts);
  }
}
