import { IsBoolean, ValidateIf } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from 'src/users/dtos/create-user.dto';

export class CreateAdminDto {

    @ApiProperty({
        default: false,
    })
    @IsBoolean()
    @ValidateIf(o => o.superAdmin !== undefined)
    superAdmin: boolean;

}