import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alert } from 'src/schemas/alert.schema';

@Injectable()
export class AlertsService {
  constructor(@InjectModel(Alert.name) private alertModel: Model<Alert>) {}

  async getAlertsByCity(city: string): Promise<Alert[]> {
    return this.alertModel.find({ city }).exec();
  }

  async getCountByCity(city: string): Promise<number> {
    return this.alertModel.countDocuments({ city });
  }

  async addAlerts(alerts: Alert[]): Promise<void> {
    await this.alertModel.insertMany(alerts);
  }
}
