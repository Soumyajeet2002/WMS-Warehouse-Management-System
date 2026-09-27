import {
  Body,
  Controller,
  Post, Get,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Vendors')
@ApiBearerAuth()
@Controller('vendors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VendorsController {
  constructor(
    private readonly vendorsService: VendorsService,
  ) { }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Create a vendor and its login account',
  })

  async createVendor(
    @Body() createVendorDto: CreateVendorDto,
  ) {
    return this.vendorsService.createVendor(
      createVendorDto,
    );
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get all vendors',
  })

  async findAll() {
    return this.vendorsService.findAll();
  }
}