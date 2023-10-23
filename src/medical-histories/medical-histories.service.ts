import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalHistory } from './entities/medical-history.entity';
import { Repository } from 'typeorm';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PatientsService } from 'src/patients/patients.service';
import { CreateMedicalHistoryDto } from './dtos/create-medical-histories.dto';
import { UpdateMedicalHistoryDto } from './dtos/update-medical-histories.dto';

@Injectable()
export class MedicalHistoriesService {
  constructor(
    @InjectRepository(MedicalHistory)
    private medicalHistoryRepository: Repository<MedicalHistory>,
    private doctorService: DoctorsService,
    private patientService: PatientsService,
  ) {}

  async create(
    doctorId: number,
    createMedicalHistoryDto: CreateMedicalHistoryDto,
  ) {
    const { patientId, ...rest } = createMedicalHistoryDto;

    const doctor = await this.doctorService.findOneOrFail(doctorId);
    const patient = await this.patientService.findOneOrFail(patientId);

    return await this.medicalHistoryRepository.save({
      doctor,
      patient,
      ...rest,
    });
  }

  async findOneOrFail(id: number) {
    const medicalHistory = await this.medicalHistoryRepository.findOne({
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

    if (!medicalHistory) {
      throw new HttpException(
        'Medical History not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return medicalHistory;
  }

  async update(id: number, updateMedicalHistoryDto: UpdateMedicalHistoryDto) {
    await this.findOneOrFail(id);
    return await this.medicalHistoryRepository.update(
      id,
      updateMedicalHistoryDto,
    );
  }

  async remove(id: number) {
    await this.findOneOrFail(id);
    await this.medicalHistoryRepository.delete(id);
  }

  async patientMedicalHistories(patientId: number) {
    return await this.medicalHistoryRepository.find({
      where: {
        patient: { userId: patientId },
      },
      relations: {
        doctor: {
          user: true,
        },
      },
    });
  }
}
