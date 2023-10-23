import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient .entity';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,
  ) { }

  async findOneOrFail(id: number) {
    const patient = await this.patientRepository.findOne({
      where: {
        user: { id },
      },
      relations: ['user', 'appointments', 'prescriptions'],
    });

    if (!patient) {
      throw new HttpException('Patient not found', 404);
    }

    return patient;
  }

  async create(user: User, createPatientDto: CreatePatientDto) {
    return await this.patientRepository.save({
      user,
      ...createPatientDto,
    });
  }

  async remove(id: number) {
    await this.findOneOrFail(id);
    await this.patientRepository.delete(id);
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    await this.findOneOrFail(id);
    const { name, ...rest } = updatePatientDto;

    await this.patientRepository.update(id, rest);
    await this.userRepository.update(id, {
      name,
    });
  }
}
