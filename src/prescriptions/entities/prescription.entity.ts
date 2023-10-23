import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient .entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Prescription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    medication: string;

    @Column()
    dosage: number;

    @Column()
    frequency: number;

    @ManyToOne(() => Doctor, (doctor) => doctor.prescriptions)
    doctor: Doctor;

    @ManyToOne(() => Patient, (patient) => patient.prescriptions)
    patient: Patient;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;
}
