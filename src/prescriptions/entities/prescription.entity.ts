import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Prescription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    medication: string;

    @Column()
    dosage: string;

    @Column()
    frequency: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;
}
