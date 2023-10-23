import {
  Controller,
  HttpStatus,
  HttpCode,
  Get,
  UseGuards,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { UserRole } from 'src/users/types';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { sendResponse } from 'src/helpers';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { ApiTags } from '@nestjs/swagger';
import { PatientPresenter } from './presenters/patient.presenter';

@ApiTags('Patients APIs')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  async findAll() {
    const patients = await this.patientsService.findAll();
    const patientsPresenters = patients.map(
      (patient) => new PatientPresenter(patient),
    );
    return sendResponse('Patients fetched successfully', patientsPresenters);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  async findOne(@Param('id') id: number) {
    const patient = await this.patientsService.findOneOrFail(+id);
    return sendResponse(
      'Patient fetched successfully',
      new PatientPresenter(patient),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  async update(
    @Param('id') id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    await this.patientsService.update(+id, updatePatientDto);
    return sendResponse('Patient updated successfully', {});
  }
}
