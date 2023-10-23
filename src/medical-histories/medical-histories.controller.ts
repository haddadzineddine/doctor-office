import { Controller, HttpCode, HttpStatus, Post, UseGuards, Body, Request, Get, Query, Patch, Delete } from '@nestjs/common';
import { MedicalHistoriesService } from './medical-histories.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { UserRole } from 'src/users/types';
import { Roles } from 'src/users/decorators/roles.decorator';
import { CreateMedicalHistoryDto } from './dtos/create-medical-histories.dto';
import { AuthRequest } from 'src/auth/types';
import { sendResponse } from 'src/helpers';
import { UpdateMedicalHistoryDto } from './dtos/update-medical-histories.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Medical Histories APIs')
@Controller('medical-histories')
export class MedicalHistoriesController {
  constructor(private readonly medicalHistoriesService: MedicalHistoriesService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  async create(@Body() createMedicalHistoryDto: CreateMedicalHistoryDto, @Request() req: AuthRequest) {
    const doctorId = req.user.id;
    const { id } = await this.medicalHistoriesService.create(doctorId, createMedicalHistoryDto);
    return sendResponse('Medical History created successfully', { id });
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  // @UseGuasrds(AuthGuard, RolesGuard)
  // @Roles(UserRole.DOCTOR)
  async findOne(@Query('id') id: number) {
    const medicalHistory = await this.medicalHistoriesService.findOneOrFail(+id);
    return sendResponse('Medical History fetched successfully', medicalHistory);
  }

  @HttpCode(HttpStatus.OK)
  @Patch()
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.DOCTOR)
  async update(@Query('id') id: number, @Body() updateMedicalHistoryDto: UpdateMedicalHistoryDto) {
    await this.medicalHistoriesService.update(id, updateMedicalHistoryDto);
    return sendResponse('Medical History updated successfully', {});
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.DOCTOR)
  async remove(@Query('id') id: number) {
    await this.medicalHistoriesService.remove(+id);
    return sendResponse('Medical History deleted successfully', {});
  }
}
