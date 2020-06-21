import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInRqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  uuid: string;
}
