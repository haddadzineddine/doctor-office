import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patient } from './entities/patient .entity';
import { User } from 'src/users/entities/user.entity';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, User, Prescription])],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule { }
