import { IsNumber } from 'class-validator';

export class ChangeTaskUserDto {
  @IsNumber()
  userId: number;
}
