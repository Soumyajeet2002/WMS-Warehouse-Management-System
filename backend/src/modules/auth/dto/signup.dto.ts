import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    example: 'vendor@example.com',
    description: 'Email address used to log in',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Account password',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password!: string;
}
