import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient .entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class MedicalHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    diagnosis: string;

    @Column()
    treatment: string;

    @Column()
    notes: string;

    @ManyToOne(() => Doctor, (doctor) => doctor.medicalHistories)
    doctor: Doctor;

    @ManyToOne(() => Patient, (patient) => patient.medicalHistories)
    patient: Patient;
}
