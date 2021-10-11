import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(32)
  password: string;
}
