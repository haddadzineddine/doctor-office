import {
  Controller,
  HttpStatus,
  HttpCode,
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
import { PrescriptionsService } from './prescriptions.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { UserRole } from 'src/users/types';
import { Roles } from 'src/users/decorators/roles.decorator';
import { CreatePrescriptionDto } from './dtos/create-prescription.dto';
import { AuthRequest } from 'src/auth/types';
import { sendResponse } from 'src/helpers';
import { UpdatePrescriptionDto } from './dtos/update-prescription.dto';
import { ApiTags } from '@nestjs/swagger';
import { PrescriptionsPresenter } from './presenters/prescription.presenter';

@ApiTags('Prescriptions APIs')
@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  async create(
    @Body() createPrescriptionDto: CreatePrescriptionDto,
    @Request() req: AuthRequest,
  ) {
    const doctorId = req.user.sub;
    const { id } = await this.prescriptionsService.create(
      doctorId,
      createPrescriptionDto,
    );
    return sendResponse('Prescription created successfully', { id });
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  async findOne(@Param('id') id: number) {
    const prescription = await this.prescriptionsService.findOneOrFail(+id);
    return sendResponse(
      'Prescription fetched successfully',
      new PrescriptionsPresenter(prescription),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  async update(
    @Param('id') id: number,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    await this.prescriptionsService.update(+id, updatePrescriptionDto);
    return sendResponse('Prescription updated successfully', {});
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.DOCTOR)
  async remove(@Param('id') id: number) {
    await this.prescriptionsService.remove(+id);
    return sendResponse('Prescription deleted successfully', {});
  }

  @HttpCode(HttpStatus.OK)
  @Get('patient/:id')
  async prescriptions(@Param('id') id: number) {
    const patientPrescriptions =
      await this.prescriptionsService.patientPrescriptions(+id);
    const patientPrescriptionsPresenter = patientPrescriptions.map(
      (prescription) => new PrescriptionsPresenter(prescription),
    );
    return sendResponse(
      "Patient's Prescriptions fetched successfully",
      patientPrescriptionsPresenter,
    );
  }
}
