import { Controller, HttpStatus, HttpCode, Post, Get, UseGuards, Patch, Body, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { UserRole } from 'src/users/types';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { sendResponse } from 'src/helpers';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Patients APIs')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) { }

  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  async findOne(@Query('id') id: number) {
    const patient = await this.patientsService.findOneOrFail(+id);
    return sendResponse('Appointment fetched successfully', patient);
  }


  @HttpCode(HttpStatus.OK)
  @Patch()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  async update(@Query('id') id: number, @Body() updatePatientDto: UpdatePatientDto) {
    await this.patientsService.update(id, updatePatientDto);
    return sendResponse('Appointment updated successfully', {});
  }

  @HttpCode(HttpStatus.OK)
  @Get('appointments')
  async appointments(@Query('id') id: number) {
    const appointments = await this.patientsService.appointments(+id);
    return sendResponse('Appointments fetched successfully', appointments);
  }

  @HttpCode(HttpStatus.OK)
  @Get('prescriptions')
  async prescriptions(@Query('id') id: number) {
    const prescriptions = await this.patientsService.prescriptions(+id);
    return sendResponse('Appointments fetched successfully', prescriptions);
  }

  @HttpCode(HttpStatus.OK)
  @Get('medical-histories')
  async medicalHistories(@Query('id') id: number) {
    const medicalHistories = await this.patientsService.medicalHistories(+id);
    return sendResponse('Medical Histories fetched successfully', medicalHistories);
  }


}
