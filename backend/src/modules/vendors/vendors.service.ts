import {
    ConflictException,
    Injectable,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { DataSource, Repository } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  
  import { Vendor } from './entities/vendor.entity';
  import { User, UserRole } from '../users/entities/user.entity';
  import { CreateVendorDto } from './dto/create-vendor.dto';
  
  @Injectable()
  export class VendorsService {
    constructor(
      @InjectRepository(Vendor)
      private readonly vendorsRepository: Repository<Vendor>,
  
      @InjectRepository(User)
      private readonly usersRepository: Repository<User>,
  
      private readonly dataSource: DataSource,
    ) {}
  
    async createVendor(createVendorDto: CreateVendorDto) {
      const email = createVendorDto.email
        .toLowerCase()
        .trim();
  
      const code = createVendorDto.code
        .trim()
        .toUpperCase();
  
      const existingVendor = await this.vendorsRepository.findOne({
        where: [
          { email },
          { code },
        ],
      });
  
      if (existingVendor) {
        throw new ConflictException(
          'A vendor with this email or code already exists',
        );
      }
  
      const existingUser = await this.usersRepository.findOne({
        where: {
          email,
        },
      });
  
      if (existingUser) {
        throw new ConflictException(
          'A user account with this email already exists',
        );
      }
  
      const passwordHash = await bcrypt.hash(
        createVendorDto.password,
        12,
      );
  
      return this.dataSource.transaction(
        async (manager) => {
          const vendorRepository =
            manager.getRepository(Vendor);
  
          const userRepository =
            manager.getRepository(User);
  
          const vendor = vendorRepository.create({
            code,
            name: createVendorDto.name.trim(),
            email,
            phone: createVendorDto.phone?.trim() ?? null,
            address: createVendorDto.address?.trim() ?? null,
            isActive: true,
          });
  
          const savedVendor =
            await vendorRepository.save(vendor);
  
          const user = userRepository.create({
            email,
            passwordHash,
            role: UserRole.VENDOR,
            vendorId: savedVendor.id,
            isActive: true,
          });
  
          const savedUser =
            await userRepository.save(user);
  
          return {
            message: 'Vendor created successfully',
            vendor: {
              id: savedVendor.id,
              code: savedVendor.code,
              name: savedVendor.name,
              email: savedVendor.email,
              phone: savedVendor.phone,
              address: savedVendor.address,
              isActive: savedVendor.isActive,
            },
            user: {
              id: savedUser.id,
              email: savedUser.email,
              role: savedUser.role,
              vendorId: savedUser.vendorId,
            },
          };
        },
      );
    }
    async findAll() {
        return this.vendorsRepository.find({
          order: {
            createdAt: 'DESC',
          },
        });
      }
  }