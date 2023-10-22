import { Module } from '@nestjs/common';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { MedicalHistoriesModule } from './medical-histories/medical-histories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATA_BASE_CONFIG } from './config/database';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DATA_BASE_CONFIG),
    DoctorsModule,
    PatientsModule,
    AppointmentsModule,
    PrescriptionsModule,
    MedicalHistoriesModule,
    AuthModule,
    UsersModule,
    AdminsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
