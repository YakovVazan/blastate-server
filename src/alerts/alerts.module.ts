import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Alert, AlertSchema } from 'src/schemas/alert.schema';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';
import { CitiesModule } from 'src/cities/cities.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Alert.name, schema: AlertSchema }]),
    CitiesModule,
  ],
  controllers: [AlertsController],
  providers: [AlertsService],
})
export class AlertsModule {}
