import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPhoneNumber,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentRsDto {
  @IsString()
  @ApiProperty()
  type: string;

  @IsString()
  @ApiProperty()
  referenceCode: string;
}
