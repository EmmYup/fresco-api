import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PriceRsDto } from './dto/priceRs.dto';
import { PriceService } from './price.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Price } from './price.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('price')
export class PriceController {
  constructor(private readonly _priceService: PriceService) {}

  @Get(':productId')
  async getPrice(@Param('productId') productId): Promise<Price> {
    return await this._priceService.lastPriceByProduct(productId);
  }
}
