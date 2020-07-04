import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderProduct } from './entities/orderProduct.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly _orderRepo: Repository<Order>,
  ) {}
  async new(order: Order) {
    return await this._orderRepo.save(order);
  }

  async addProduct(order: OrderProduct) {
    return await this._orderRepo.save(order);
  }

  async byId(id: number) {
    return await this._orderRepo.findOneOrFail({
      where: { id },
      relations: ['orderProducts', 'orderProducts.product'],
    });
  }
}
