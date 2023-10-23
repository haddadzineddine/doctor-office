import { ApiProperty } from '@nestjs/swagger';
import { DoctorPresenter } from 'src/doctors/presenters/doctor.presenter';
import { PatientPresenter } from 'src/patients/presenters/patient.presenter';
import { Prescription } from '../entities/prescription.entity';

export class PrescriptionsPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  medication: string;

  @ApiProperty()
  dosage: number;

  @ApiProperty()
  frequency: number;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  doctor: DoctorPresenter;

  @ApiProperty()
  patient: PatientPresenter;

  constructor(prescription: Prescription) {
    this.id = prescription.id;
    this.medication = prescription.medication;
    this.dosage = prescription.dosage;
    this.frequency = prescription.frequency;
    this.startDate = prescription.startDate;
    this.endDate = prescription.endDate;

    this.doctor = prescription.doctor
      ? new DoctorPresenter(prescription.doctor)
      : undefined;
    this.patient = prescription.patient
      ? new PatientPresenter(prescription.patient)
      : undefined;
  }
}
