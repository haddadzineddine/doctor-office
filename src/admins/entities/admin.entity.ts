import { User } from '../../users/entities/user.entity';
import { Entity, OneToOne, PrimaryColumn, JoinColumn, Column } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryColumn()
  userId: number;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    default: false,
  })
  superAdmin: boolean;
}
