import { Appointment } from 'src/appointments/entities/appointment.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, OneToMany, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';

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
}
