import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '../entities/patient .entity';

export class PatientPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  dateOfBirth: Date;

  constructor(patient: Patient) {
    this.id = patient.userId;
    this.name = patient.user.name;
    this.email = patient.user.email;
    this.address = patient.address;
    this.dateOfBirth = patient.dateOfBirth;
  }
}
