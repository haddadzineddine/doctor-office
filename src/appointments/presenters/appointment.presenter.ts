import { ApiProperty } from "@nestjs/swagger";
import { Appointment } from "../entities/appointment.entity";
import { DoctorPresenter } from "src/doctors/presenters/doctor.presenter";
import { PatientPresenter } from "src/patients/presenters/patient.presenter";

export class AppointmentPresenter {

    @ApiProperty()
    id: number;

    @ApiProperty()
    reason: string;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    time: string;

    @ApiProperty()
    doctor: DoctorPresenter;

    @ApiProperty()
    patient: PatientPresenter;

    constructor(appointment: Appointment) {
        this.id = appointment.id;
        this.reason = appointment.reason;
        this.date = appointment.date;
        this.time = appointment.time;

        this.doctor = appointment.doctor ? new DoctorPresenter(appointment.doctor) : undefined;
        this.patient = appointment.patient ? new PatientPresenter(appointment.patient) : undefined;
    }
}