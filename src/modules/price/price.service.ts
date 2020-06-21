import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product/product.entity';
import { Price } from './price.entity';
import { Repository } from 'typeorm';
import { classToClass, plainToClass } from 'class-transformer';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private readonly _priceRepo: Repository<Price>,
  ) {}

  async lastPriceByProduct(product: number): Promise<Price> {
    return await this._priceRepo.findOne({
      relations: ['product'],
      where: { product },
      order: { id: 'DESC' },
    });
    //return plainToClass(PriceRsDto, price);
  }
}
