import { Appointment } from 'src/appointments/entities/appointment.entity';
import { MedicalHistory } from 'src/medical-histories/entities/medical-history.entity';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Patient {
  @PrimaryColumn()
  userId: number;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  dateOfBirth: Date;

  @Column()
  address: string;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @OneToMany(() => Prescription, (prescription) => prescription.patient)
  prescriptions: Prescription[];

  @OneToMany(
    () => MedicalHistory,
    (medicalHistories) => medicalHistories.patient,
  )
  medicalHistories: MedicalHistory[];
}
