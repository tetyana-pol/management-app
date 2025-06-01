import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 18, { message: 'too long' })
  name: string;

  @IsEmail()
  email: string;
}
