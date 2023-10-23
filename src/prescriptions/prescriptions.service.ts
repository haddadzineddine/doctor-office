import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PatientsService } from 'src/patients/patients.service';
import { Repository } from 'typeorm';
import { CreatePrescriptionDto } from './dtos/create-prescription.dto';
import { UpdatePrescriptionDto } from './dtos/update-prescription.dto';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,
    private doctorService: DoctorsService,
    private patientService: PatientsService,
  ) { }

  async create(doctorId: number, createPrescriptionDto: CreatePrescriptionDto) {
    const { patientId, ...rest } = createPrescriptionDto;

    const doctor = await this.doctorService.findOneOrFail(doctorId);
    const patient = await this.patientService.findOneOrFail(patientId);

    return await this.prescriptionRepository.save({
      doctor,
      patient,
      ...rest,
    });
  }

  async findOneOrFail(id: number) {
    const prescription = await this.prescriptionRepository.findOne({
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

    if (!prescription) {
      throw new HttpException('Prescription not found', HttpStatus.NOT_FOUND);
    }

    return prescription;
  }

  async remove(id: number) {
    await this.findOneOrFail(id);
    await this.prescriptionRepository.delete(id);
  }

  async update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    await this.findOneOrFail(id);
    return await this.prescriptionRepository.update(id, updatePrescriptionDto);
  }

  async patientPrescriptions(patientId: number) {
    return await this.prescriptionRepository.find({
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
  
}
