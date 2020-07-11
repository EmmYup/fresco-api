import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProduct } from '../order/entities/orderProduct.entity';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProduct)
    private readonly _orderProductRepo: Repository<OrderProduct>,
  ) {}

  async byIdOrderAndProduct(
    orderId: number,
    productId: number,
  ): Promise<OrderProduct> {
    return await this._orderProductRepo.findOne({
      where: [{ order: orderId, product: productId }],
    });
  }

  async byOrderProductId(orderId: number, id: number): Promise<OrderProduct> {
    return await this._orderProductRepo.findOne({
      where: [{ order: orderId, id }],
    });
  }
}
