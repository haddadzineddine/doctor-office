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
}
