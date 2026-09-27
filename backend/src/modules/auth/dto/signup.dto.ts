import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'passwordMatch', async: false })
export class PasswordMatchConstraint
  implements ValidatorConstraintInterface
{
  validate(retypePassword: string, args: any) {
    return retypePassword === args.object.password;
  }

  defaultMessage() {
    return 'Password and retype password must match';
  }
}

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

  @ApiProperty({
    example: 'Password123!',
    description: 'Must match the password',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  @Validate(PasswordMatchConstraint)
  retypePassword!: string;
}