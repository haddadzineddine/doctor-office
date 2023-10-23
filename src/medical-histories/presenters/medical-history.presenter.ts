import { ApiProperty } from "@nestjs/swagger";
import { DoctorPresenter } from "src/doctors/presenters/doctor.presenter";
import { PatientPresenter } from "src/patients/presenters/patient.presenter";
import { MedicalHistory } from "../entities/medical-history.entity";

export class MedicalHistoryPresenter {

    @ApiProperty()
    id: number;

    @ApiProperty()
    diagnosis: string;

    @ApiProperty()
    treatment: string;

    @ApiProperty()
    notes: string;

    @ApiProperty()
    doctor: DoctorPresenter;

    @ApiProperty()
    patient: PatientPresenter;

    constructor(medicalHistory: MedicalHistory) {
        this.id = medicalHistory.id;
        this.diagnosis = medicalHistory.diagnosis;
        this.treatment = medicalHistory.treatment;
        this.notes = medicalHistory.notes;


        this.doctor = medicalHistory.doctor ? new DoctorPresenter(medicalHistory.doctor) : undefined;
        this.patient = medicalHistory.patient ? new PatientPresenter(medicalHistory.patient) : undefined;
    }
}