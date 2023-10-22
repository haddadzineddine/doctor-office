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
  Request
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
import { AuthRequest, PayLoad } from 'src/auth/types';

@ApiTags('Appointments APIs')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }


  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  async create(@Body() createAppointmentDto: CreateAppointmentDto, @Request() req: AuthRequest) {
    const doctorId = req.user.id;
    const { id } = await this.appointmentsService.create(doctorId, createAppointmentDto);
    return sendResponse('Appointment created successfully', { id });
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  // @UseGuasrds(AuthGuard, RolesGuard)
  // @Roles(UserRole.DOCTOR)
  async findOne(@Query('id') id: number) {
    const appointment = await this.appointmentsService.findOneOrFail(+id);
    return sendResponse('Appointment fetched successfully', appointment);
  }

  @HttpCode(HttpStatus.OK)
  @Patch()
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.DOCTOR)
  async update(@Query('id') id: number, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    await this.appointmentsService.update(id, updateAppointmentDto);
    return sendResponse('Appointment updated successfully', {});
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.DOCTOR)
  async remove(@Query('id') id: number) {
    await this.appointmentsService.remove(+id);
    return sendResponse('Appointment deleted successfully', {});
  }

}
