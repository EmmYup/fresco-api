import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPhoneNumber,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDeliverRqDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsPhoneNumber('MX')
  phone: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  direction: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  postalCode: string;

  @ApiProperty()
  @IsString()
  comments: string;

  @ApiProperty()
  @IsLatitude()
  latitude: number;

  @ApiProperty()
  @IsLongitude()
  longitude: number;
}
