import { MinLength, IsBoolean } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { IsDate } from 'class-validator';
import { IsEmail, IsEnum, IsString, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../types';

export class UserDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class CreateUserDto extends UserDto {
  @ApiProperty({
    enum: UserRole,
    default: UserRole.ADMIN,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @ValidateIf((o) => o.role === UserRole.PATIENT)
  dateOfBirth: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.role === UserRole.PATIENT)
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.role === UserRole.DOCTOR)
  specialization: string;

  @ApiProperty({
    default: false,
  })
  @IsBoolean()
  @ValidateIf((o) => o.role === UserRole.ADMIN && o.superAdmin !== undefined)
  superAdmin: boolean;
}
