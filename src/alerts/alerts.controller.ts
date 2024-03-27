import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AlertsService } from './alerts.service';
import { Alert } from 'src/schemas/alert.schema';
import { heatmapDetails } from 'src/interfaces/heatmapDetails.interface';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  getAllAlerts(@Query('date') date?: string): Promise<heatmapDetails[]> {
    return this.alertsService.getAllAlerts(date);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('count')
  getSumAlertsPerCity(
    @Body('city') city: string,
    @Body('targetDate') targetDate: string,
  ): Promise<number> {
    return this.alertsService.getSumAlertsPerCity(city, targetDate);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('charts_data')
  getDataForChartsFormat(@Body('city') city: string): Promise<number[]> {
    return this.alertsService.getDataForChartsFormat(city);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  addAlerts(@Body('alerts') alerts: Alert[]) {
    return this.alertsService.addAlerts(alerts);
  }
}
