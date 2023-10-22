import { Controller } from '@nestjs/common';
import { MedicalHistoriesService } from './medical-histories.service';

@Controller('medical-histories')
export class MedicalHistoriesController {
  constructor(private readonly medicalHistoriesService: MedicalHistoriesService) {}
}
