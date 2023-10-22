import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AdminsService {

    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>
    ) { }


    async findOneOrFail(id: number) {
        return await this.adminRepository.findOneOrFail({
            where: {
                user: { id }
            },
            relations: ['user']
        });
    }

    async create(user: User, createAdminDto: CreateAdminDto) {
        return await this.adminRepository.save({
            user,
            ...createAdminDto
        });
    }
}
