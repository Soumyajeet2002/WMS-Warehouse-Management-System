import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Warehouse } from './entities/warehouse.entity';
import { Vendor } from '../vendors/entities/vendor.entity';

import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Warehouse,
      Vendor,
    ]),
  ],
  controllers: [
    WarehousesController,
  ],
  providers: [
    WarehousesService,
  ],
})
export class WarehousesModule {}