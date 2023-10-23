import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Body,
  Request,
  Get,
  Query,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
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
import { MedicalHistoryPresenter } from './presenters/medical-history.presenter';

@ApiTags('Medical Histories APIs')
@Controller('medical-histories')
export class MedicalHistoriesController {
  constructor(
    private readonly medicalHistoriesService: MedicalHistoriesService,
  ) { }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  async create(
    @Body() createMedicalHistoryDto: CreateMedicalHistoryDto,
    @Request() req: AuthRequest,
  ) {
    const doctorId = req.user.sub;
    const { id } = await this.medicalHistoriesService.create(
      doctorId,
      createMedicalHistoryDto,
    );
    return sendResponse('Medical History created successfully', { id });
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  async findOne(@Query('id') id: number) {
    const medicalHistory = await this.medicalHistoriesService.findOneOrFail(
      +id,
    );
    return sendResponse('Medical History fetched successfully', medicalHistory);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  async update(
    @Param('id') id: number,
    @Body() updateMedicalHistoryDto: UpdateMedicalHistoryDto,
  ) {
    await this.medicalHistoriesService.update(+id, updateMedicalHistoryDto);
    return sendResponse('Medical History updated successfully', {});
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  async remove(@Param('id') id: number) {
    await this.medicalHistoriesService.remove(+id);
    return sendResponse('Medical History deleted successfully', {});
  }

  @HttpCode(HttpStatus.OK)
  @Get('patient/:id')
  async medicalHistories(@Param('id') id: number) {
    const medicalHistories = await this.medicalHistoriesService.patientMedicalHistories(+id);
    const medicalHistoriesPresenter = medicalHistories.map(medicalHistory => new MedicalHistoryPresenter(medicalHistory));
    return sendResponse(
      "Patient's Medical Histories fetched successfully",
      medicalHistoriesPresenter,
    );
  }
}
