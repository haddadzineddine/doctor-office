import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreatePrescriptionDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    medication: string;

    @ApiProperty()
    @IsInt()
    @Min(1)
    dosage: number;

    @ApiProperty()
    @IsInt()
    @Min(1)
    frequency: number;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    endDate: Date;

    @ApiProperty()
    @IsInt()
    patientId: number;
}