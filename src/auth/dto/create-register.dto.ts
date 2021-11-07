import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateRegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  firstName: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  lastName: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  password: string;
}
