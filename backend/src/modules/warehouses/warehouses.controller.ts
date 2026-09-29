import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';

import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@ApiTags('Warehouses')
@ApiBearerAuth()
@Controller('warehouses')
@UseGuards(JwtAuthGuard)
export class WarehousesController {
    constructor(
        private readonly warehousesService: WarehousesService,
    ) { }

    @Post()
    @ApiOperation({
        summary: 'Create a warehouse',
    })
    async create(
        @Body() createWarehouseDto: CreateWarehouseDto,
        @Req() request: any,
    ) {
        return this.warehousesService.create(
            createWarehouseDto,
            request.user.vendorId,
        );
    }
    @Get()
    @ApiOperation({
        summary: 'Get warehouses',
        description:
            'ADMIN users receive all warehouses. VENDOR users receive only their own warehouses.',
    })

    async findAll(
        @Req() request: any,
    ) {
        return this.warehousesService.findAll(
            request.user.role,
            request.user.vendorId,
        );
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get a warehouse by ID',
        description:
            'ADMIN can access any warehouse. VENDOR can access only their own warehouse.',
    })
    async findOne(
        @Param('id') id: string,
        @Req() request: any,
    ) {
        return this.warehousesService.findOne(
            id,
            request.user.role,
            request.user.vendorId,
        );
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Update a warehouse',
        description:
            'ADMIN can update any warehouse. VENDOR can update only their own warehouse.',
    })

    async update(
        @Param('id') id: string,
        @Body() updateWarehouseDto: UpdateWarehouseDto,
        @Req() request: any,
    ) {
        return this.warehousesService.update(
            id,
            updateWarehouseDto,
            request.user.role,
            request.user.vendorId,
        );
    }
    @Delete(':id')
    @ApiOperation({
        summary: 'Deactivate a warehouse',
        description:
            'Soft deletes a warehouse by setting isActive to false.',
    })
    async remove(
        @Param('id') id: string,
        @Req() request: any,
    ) {
        return this.warehousesService.remove(
            id,
            request.user.role,
            request.user.vendorId,
        );
    }
}