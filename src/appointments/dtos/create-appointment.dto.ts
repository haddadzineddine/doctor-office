import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsString, IsNotEmpty, IsDate } from "class-validator";

export class CreateAppointmentDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    reason: string;

    @ApiProperty()
    @IsInt()
    patientId: number;

    @ApiProperty()
    @IsNotEmpty()
    time: string;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    date: Date;
}
