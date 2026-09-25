import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(signupDto: SignupDto) {
    const email = signupDto.email.toLowerCase().trim();

    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(signupDto.password, 12);

    const user = await this.usersService.createVendorUser(email, passwordHash);

    return {
      message: 'Account created successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        vendorId: user.vendorId,
      },
    };
  }
}
