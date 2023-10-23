import { PartialType } from '@nestjs/mapped-types';
import { OmitType } from '@nestjs/swagger';
import { CreateMedicalHistoryDto } from './create-medical-histories.dto';

export class UpdateMedicalHistoryDto extends PartialType(
  OmitType(CreateMedicalHistoryDto, ['patientId'] as const),
) {}
