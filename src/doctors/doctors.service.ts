import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dtos/create-doctor.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async findOneOrFail(id: number) {
    const doctor = await this.doctorRepository.findOne({
      where: {
        user: { id },
      },
      relations: ['user'],
    });

    if (!doctor) {
      throw new HttpException('Doctor not found', 404);
    }

    return doctor;
  }

  async create(user: User, createDoctorDto: CreateDoctorDto) {
    return await this.doctorRepository.save({
      user,
      ...createDoctorDto,
    });
  }
}
