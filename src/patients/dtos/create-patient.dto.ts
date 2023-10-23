import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
}
