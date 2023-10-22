import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtOptions } from 'src/config/jwt';


@Module({
  imports: [
    UsersModule,
    JwtModule.register(jwtOptions)
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
