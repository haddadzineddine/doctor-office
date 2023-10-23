import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from '../types';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    enum: UserRole,
    default: UserRole.ADMIN,
  })
  role: UserRole;

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
