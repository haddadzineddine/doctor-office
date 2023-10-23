import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Doctor } from "../entities/doctor.entity";

export class DoctorPresenter {

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    specialization: string;


    constructor(doctor: Doctor) {
        this.id = doctor.userId;
        this.name = doctor.user.name;
        this.email = doctor.user.email;
        this.specialization = doctor.specialization;
    }
}