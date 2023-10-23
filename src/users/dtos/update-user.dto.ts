import { OmitType, PartialType } from '@nestjs/mapped-types';
import { UserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(UserDto, ['password', 'email']),
) {}
