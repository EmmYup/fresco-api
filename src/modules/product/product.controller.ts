import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRsDto } from './dto/productRs.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PriceService } from '../price/price.service';
import { Price } from '../price/price.entity';

//@ApiBearerAuth()
//@UseGuards(AuthGuard())

@Controller('product')
export class ProductController {
  constructor(
    private readonly _productService: ProductService,
    private readonly _priceService: PriceService,
  ) {}

  @Get()
  async getAllActive(): Promise<ProductRsDto[]> {
    return this._productService.allActive();
  }

  @Get(':productId')
  async productById(@Param('productId') productId): Promise<any> {
    //return 1;
    return this._priceService.lastPriceByProduct(productId);
  }
}
