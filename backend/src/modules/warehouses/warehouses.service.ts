import {
    ConflictException,
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';


import { UserRole } from '../users/entities/user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Warehouse } from './entities/warehouse.entity';
import { Vendor } from '../vendors/entities/vendor.entity';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Injectable()
export class WarehousesService {
    constructor(
        @InjectRepository(Warehouse)
        private readonly warehousesRepository: Repository<Warehouse>,

        @InjectRepository(Vendor)
        private readonly vendorsRepository: Repository<Vendor>,
    ) { }

    async create(
        createWarehouseDto: CreateWarehouseDto,
        vendorId: string,
    ) {
        const vendor = await this.vendorsRepository.findOne({
            where: {
                id: vendorId,
                isActive: true,
            },
        });

        if (!vendor) {
            throw new NotFoundException(
                'Vendor not found or inactive',
            );
        }

        const code = createWarehouseDto.code
            .trim()
            .toUpperCase();

        const existingWarehouse =
            await this.warehousesRepository.findOne({
                where: {
                    code,
                },
            });

        if (existingWarehouse) {
            throw new ConflictException(
                'A warehouse with this code already exists',
            );
        }

        const warehouse =
            this.warehousesRepository.create({
                vendorId: vendor.id,
                code,
                name: createWarehouseDto.name.trim(),
                address:
                    createWarehouseDto.address?.trim() ?? null,
                isActive: true,
            });

        const savedWarehouse =
            await this.warehousesRepository.save(warehouse);

        return {
            message: 'Warehouse created successfully',
            warehouse: savedWarehouse,
        };
    }
    async findAll(
        role: UserRole,
        vendorId: string | null,
    ) {
        if (role === UserRole.ADMIN) {
            return this.warehousesRepository.find({
                order: {
                    createdAt: 'DESC',
                },
            });
        }

        if (!vendorId) {
            throw new ForbiddenException(
                'Vendor account is not associated with a vendor',
            );
        }

        return this.warehousesRepository.find({
            where: {
                vendorId,
                isActive: true,
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }
    async findOne(
        id: string,
        role: UserRole,
        vendorId: string | null,
    ) {
        const warehouse =
            await this.warehousesRepository.findOne({
                where: {
                    id,
                },
            });

        if (!warehouse) {
            throw new NotFoundException(
                'Warehouse not found',
            );
        }

        if (role === UserRole.ADMIN) {
            return warehouse;
        }

        if (!vendorId) {
            throw new ForbiddenException(
                'Vendor account is not associated with a vendor',
            );
        }

        if (warehouse.vendorId !== vendorId) {
            throw new ForbiddenException(
                'You do not have access to this warehouse',
            );
        }

        return warehouse;
    }
    async update(
        id: string,
        updateWarehouseDto: UpdateWarehouseDto,
        role: UserRole,
        vendorId: string | null,
    ) {
        const warehouse =
            await this.warehousesRepository.findOne({
                where: {
                    id,
                },
            });

        if (!warehouse) {
            throw new NotFoundException(
                'Warehouse not found',
            );
        }

        if (role === UserRole.VENDOR) {
            if (!vendorId) {
                throw new ForbiddenException(
                    'Vendor account is not associated with a vendor',
                );
            }

            if (warehouse.vendorId !== vendorId) {
                throw new ForbiddenException(
                    'You do not have access to this warehouse',
                );
            }
        }

        if (updateWarehouseDto.code) {
            const code = updateWarehouseDto.code
                .trim()
                .toUpperCase();

            const existingWarehouse =
                await this.warehousesRepository.findOne({
                    where: {
                        code,
                    },
                });

            if (
                existingWarehouse &&
                existingWarehouse.id !== warehouse.id
            ) {
                throw new ConflictException(
                    'A warehouse with this code already exists',
                );
            }

            warehouse.code = code;
        }

        if (updateWarehouseDto.name !== undefined) {
            warehouse.name =
                updateWarehouseDto.name.trim();
        }

        if (updateWarehouseDto.address !== undefined) {
            warehouse.address =
                updateWarehouseDto.address?.trim() || null;
        }

        const updatedWarehouse =
            await this.warehousesRepository.save(
                warehouse,
            );

        return {
            message: 'Warehouse updated successfully',
            warehouse: updatedWarehouse,
        };
    }
    async remove(
        id: string,
        role: UserRole,
        vendorId: string | null,
    ) {
        const warehouse =
            await this.warehousesRepository.findOne({
                where: {
                    id,
                },
            });

        if (!warehouse) {
            throw new NotFoundException(
                'Warehouse not found',
            );
        }

        if (role === UserRole.VENDOR) {
            if (!vendorId) {
                throw new ForbiddenException(
                    'Vendor account is not associated with a vendor',
                );
            }

            if (warehouse.vendorId !== vendorId) {
                throw new ForbiddenException(
                    'You do not have access to this warehouse',
                );
            }
        }

        if (!warehouse.isActive) {
            throw new ConflictException(
                'Warehouse is already inactive',
            );
        }

        warehouse.isActive = false;

        await this.warehousesRepository.save(
            warehouse,
        );

        return {
            message: 'Warehouse deactivated successfully',
        };
    }
}