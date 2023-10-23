import { CreateUserDto } from './../users/dtos/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { sendResponse } from 'src/helpers';
import { PayLoad } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const payload: PayLoad = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return sendResponse('User logged in successfully', {
      access_token: await this.jwtService.signAsync(payload),
    });
  }

  async signUp(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    if (await this.usersService.isEmailTaken(email)) {
      throw new UnauthorizedException('Email already taken');
    }

    const { id } = await this.usersService.create(createUserDto);

    return sendResponse('User created successfully', { id });
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmailOrFail(email);

    const passwordIsValid = await user.validatePassword(password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }
}
