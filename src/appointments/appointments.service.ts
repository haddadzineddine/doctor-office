import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PatientsService } from 'src/patients/patients.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private doctorService: DoctorsService,
    private patientService: PatientsService,
  ) { }

  async create(doctorId: number, createAppointmentDto: CreateAppointmentDto) {
    const { patientId, ...rest } = createAppointmentDto;

    const doctor = await this.doctorService.findOneOrFail(doctorId);
    const patient = await this.patientService.findOneOrFail(patientId);

    const appointmentAlreadyExists = await this.canCreateAppointment(
      doctorId,
      rest.date,
      rest.time,
    );

    if (appointmentAlreadyExists) {
      throw new HttpException(
        'Appointment already exists at this date & time',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.appointmentRepository.save({
      doctor,
      patient,
      ...rest,
    });
  }

  async findOneOrFail(id: number) {
    const appointment = await this.appointmentRepository.findOne({
      where: {
        id,
      },
      relations: {
        doctor: {
          user: true,
        },
        patient: {
          user: true,
        },
      },
    });

    if (!appointment) {
      throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
    }

    return appointment;
  }

  async remove(id: number) {
    await this.findOneOrFail(id);
    await this.appointmentRepository.delete(id);
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    await this.findOneOrFail(id);
    return await this.appointmentRepository.update(id, updateAppointmentDto);
  }

  async patientAppointments(patientId: number) {
    return await this.appointmentRepository.find({
      where: {
        patient: { userId: patientId },
      },
      relations: {
        doctor: {
          user: true,
        }
      },
    });
  }

  private async canCreateAppointment(
    doctorId: number,
    date: Date,
    time: string,
  ): Promise<boolean> {
    // a doctor can't create more than one appointment at the same date & time

    const appointment = await this.appointmentRepository.findOne({
      where: {
        doctor: { userId: doctorId },
        date: new Date(date),
        time,
      },
    });

    return !!appointment;
  }
}
