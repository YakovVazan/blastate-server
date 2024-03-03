import { Test, TestingModule } from '@nestjs/testing';
import { HeatmapController } from './heatmap.controller';
import { HeatmapService } from './heatmap.service';

describe('HeatmapController', () => {
  let controller: HeatmapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeatmapController],
      providers: [HeatmapService],
    }).compile();

    controller = module.get<HeatmapController>(HeatmapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
