import { Module } from '@nestjs/common';
import { MedicalHistoriesService } from './medical-histories.service';
import { MedicalHistoriesController } from './medical-histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalHistory } from './entities/medical-history.entity';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { PatientsModule } from 'src/patients/patients.module';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalHistory]), DoctorsModule, PatientsModule],
  controllers: [MedicalHistoriesController],
  providers: [MedicalHistoriesService],
})
export class MedicalHistoriesModule { }
