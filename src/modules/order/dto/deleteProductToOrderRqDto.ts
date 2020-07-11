import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteProductToOrderRqDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  orderProductId: number;
}
