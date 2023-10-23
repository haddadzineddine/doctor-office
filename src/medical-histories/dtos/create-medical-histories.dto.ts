import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMedicalHistoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  treatment: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  notes: string;

  @ApiProperty()
  @IsInt()
  patientId: number;
}
