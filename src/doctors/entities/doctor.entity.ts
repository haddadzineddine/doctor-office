import { Appointment } from 'src/appointments/entities/appointment.entity';
import { MedicalHistory } from 'src/medical-histories/entities/medical-history.entity';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, OneToOne, Column, OneToMany, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Doctor {

    @PrimaryColumn()
    userId: number;

    @OneToOne(() => User, { cascade: true })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    specialization: string;

    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointments: Appointment[];

    @OneToMany(() => Prescription, (prescription) => prescription.doctor)
    prescriptions: Prescription[];

    @OneToMany(() => MedicalHistory, (medicalHistories) => medicalHistories.doctor)
    medicalHistories: MedicalHistory[];
}
