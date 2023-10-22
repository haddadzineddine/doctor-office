import { CreateUserDto } from './../users/dtos/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { sendResponse } from 'src/helpers';
import { UserRole } from 'src/users/types';


@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, password: string) {

        const user = await this.validateUser(email, password);

        // forbid patients from logging in

        if (user.role === UserRole.PATIENT) {
            throw new UnauthorizedException('You are not authorized to login');
        }

        const payload = { sub: user.id, email: user.email, role: user.role };

        return sendResponse('User logged in successfully', {
            access_token: await this.jwtService.signAsync(payload),
        });
    };

    async signUp(createUserDto: CreateUserDto) {

        const { email } = createUserDto;

        if (await this.usersService.isEmailTaken(email)) {
            throw new UnauthorizedException('Email already taken');
        }

        await this.usersService.create(createUserDto);

        return sendResponse('User created successfully', {});
    };


    async validateUser(email: string, password: string) {
        const user = await this.usersService.findOneByEmailOrFail(email);

        const passwordIsValid = await user.validatePassword(password);

        if (!passwordIsValid) {
            throw new UnauthorizedException('Invalid password');
        }

        return user;
    }

}
