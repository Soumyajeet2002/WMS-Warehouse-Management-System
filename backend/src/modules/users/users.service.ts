import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      relations: { vendor: true },
    });
  }

  async createVendorUser(email: string, passwordHash: string): Promise<User> {
    const user = this.usersRepository.create({
      email,
      passwordHash,
      role: UserRole.VENDOR,
      vendorId: null,
    });

    return this.usersRepository.save(user);
  }
}
