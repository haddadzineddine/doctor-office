import { IsBoolean, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({
    default: false,
  })
  @IsBoolean()
  @ValidateIf((o) => o.superAdmin !== undefined)
  superAdmin: boolean;
}
