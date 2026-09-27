import {
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
} from '@nestjs/swagger';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';


import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Create a vendor user account',
  })
  @ApiResponse({
    status: 201,
    description: 'Account created successfully',
  })
  @ApiConflictResponse({
    description: 'An account with this email already exists',
  })
  @ApiBadRequestResponse({
    description: 'Invalid signup data',
  })
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login to the WMS',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful. Returns a JWT access token.',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid email/password or inactive account',
  })
  @ApiBadRequestResponse({
    description: 'Invalid login data',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }



  @Get('me')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiOperation({
  summary: 'Get the currently authenticated user',
})
@ApiResponse({
  status: 200,
  description: 'Returns the authenticated user',
})
@ApiUnauthorizedResponse({
  description: 'Missing or invalid JWT',
})
getMe(@Req() request: any) {
  return request.user;
}


@Get('admin-test')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@ApiBearerAuth()
@ApiOperation({
  summary: 'Test ADMIN-only access',
})
@ApiResponse({
  status: 200,
  description: 'User has ADMIN access',
})
@ApiUnauthorizedResponse({
  description: 'Missing or invalid JWT',
})
getAdminTest() {
  return {
    message: 'You have ADMIN access',
  };
}

}