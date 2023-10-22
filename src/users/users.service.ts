import { AdminsService } from './../admins/admins.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from './types';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PatientsService } from 'src/patients/patients.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private doctorService: DoctorsService,
        private patientService: PatientsService,
        private adminsService: AdminsService,
    ) { }

    async findOneByEmailOrFail(email: string) {
        const user = await this.userRepository.findOneBy({ email });

        if (!user) {
            throw new HttpException('User not found', 404);
        }

        return user;
    }

    async isEmailTaken(email: string) {
        const user = await this.userRepository.findOneBy({ email });
        return !!user;
    }

    async create(createUserDto: CreateUserDto) {

        const { name, email, password, role } = createUserDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await this.userRepository.save({ name, email, password: hashedPassword, role });

        if (role === UserRole.DOCTOR) {
            const { specialization } = createUserDto;
            await this.doctorService.create(user, { specialization });
        }

        if (role === UserRole.PATIENT) {
            const { dateOfBirth, address } = createUserDto;
            await this.patientService.create(user, { dateOfBirth, address });
        }

        if (role === UserRole.ADMIN) {
            const { superAdmin } = createUserDto;
            await this.adminsService.create(user, { superAdmin });
        }

        return user;
    }
}
