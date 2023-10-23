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
  @Get()
  // @UseGuasrds(AuthGuard, RolesGuard)
  // @Roles(UserRole.DOCTOR)
  async findOne(@Query('id') id: number) {
    const prescription = await this.prescriptionsService.findOneOrFail(+id);
    return sendResponse('Prescription fetched successfully', prescription);
  }

  @HttpCode(HttpStatus.OK)
  @Patch()
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.DOCTOR)
  async update(
    @Query('id') id: number,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    await this.prescriptionsService.update(id, updatePrescriptionDto);
    return sendResponse('Prescription updated successfully', {});
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.DOCTOR)
  async remove(@Query('id') id: number) {
    await this.prescriptionsService.remove(+id);
    return sendResponse('Prescription deleted successfully', {});
  }
}
