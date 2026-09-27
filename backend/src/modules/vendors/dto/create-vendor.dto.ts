import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateVendorDto {
  @ApiProperty({
    example: 'VEND-001',
    description: 'Unique vendor code',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  code!: string;

  @ApiProperty({
    example: 'ABC Suppliers',
    description: 'Vendor/company name',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  name!: string;

  @ApiProperty({
    example: 'abc@suppliers.com',
    description: 'Vendor login email',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '9876543210',
    description: 'Vendor phone number',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(10, 20)
  phone?: string;

  @ApiProperty({
    example: 'Bhubaneswar, Odisha, India',
    description: 'Vendor address',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Initial password for the vendor login account',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password!: string;
}