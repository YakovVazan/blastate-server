import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AlertsService } from './alerts.service';
import { Alert } from 'src/schemas/alert.schema';
import { heatmapDetails } from 'src/interfaces/heatmapDetails.interface';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAlertsByCity(@Query('city') city: string): Promise<Alert[]> {
    return this.alertsService.getAlertsByCity(city);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  getAllAlerts(): Promise<heatmapDetails[]> {
    return this.alertsService.getAllAlerts();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('count')
  getCountByCity(@Body('city') city: string): Promise<number> {
    return this.alertsService.getCountByCity(city);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  addAlerts(@Body('alerts') alerts: Alert[]) {
    return this.alertsService.addAlerts(alerts);
  }
}
