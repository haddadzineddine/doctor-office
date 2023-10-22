import { Appointment } from 'src/appointments/entities/appointment.entity';
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
}
