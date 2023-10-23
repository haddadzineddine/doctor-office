import { AuthGuard } from './../auth/guards/auth.guard';
import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Query,
  Body,
  HttpStatus,
  HttpCode,
  Request,
  Param,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { sendResponse } from 'src/helpers';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/users/decorators/roles.decorator';
import { UserRole } from 'src/users/types';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';
import { AuthRequest } from 'src/auth/types';
import { AppointmentPresenter } from './presenters/appointment.presenter';

@ApiTags('Appointments APIs')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Request() req: AuthRequest,
  ) {
    const doctorId = req.user.sub;
    const { id } = await this.appointmentsService.create(
      doctorId,
      createAppointmentDto,
    );
    return sendResponse('Appointment created successfully', { id });
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  async findOne(@Param('id') id: number) {
    const appointment = await this.appointmentsService.findOneOrFail(+id);
    return sendResponse('Appointment fetched successfully', new AppointmentPresenter(appointment));
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  async update(
    @Param('id') id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    await this.appointmentsService.update(+id, updateAppointmentDto);
    return sendResponse('Appointment updated successfully', {});
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  async remove(@Param('id') id: number) {
    await this.appointmentsService.remove(+id);
    return sendResponse('Appointment deleted successfully', {});
  }

  @HttpCode(HttpStatus.OK)
  @Get('patient/:id')
  async appointments(@Param('id') id: number) {
    const patientAppointments = await this.appointmentsService.patientAppointments(+id);
    const patientAppointmentsPresenter = patientAppointments.map(appointment => new AppointmentPresenter(appointment));
    return sendResponse("Patient's Appointments fetched successfully", patientAppointmentsPresenter);
  }


}
