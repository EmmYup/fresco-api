import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRsDto } from './dto/productRs.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly _productRepo: Repository<Product>,
  ) {}

  async allActive(): Promise<Product[]> {
    return await this._productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.prices', 'prices')
      .select()
      .groupBy('product.id')
      .getMany();
  }
  async byId(id: number): Promise<Product> {
    return await this._productRepo
      .createQueryBuilder('price')
      //.leftJoinAndSelect('product.prices', 'prices')
      .select()
      .where(`price.id = ${id}`)
      //.groupBy('product.id')
      //.orderBy({ 'price.id': 'DESC' })
      .getOne();
  }
}
