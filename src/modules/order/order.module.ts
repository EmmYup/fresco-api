import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { AuthModule } from '../auth/auth.module';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderDeliver } from './entities/orderDeliver.entity';
import { OrderProduct } from './entities/orderProduct.entity';
import { ProductModule } from '../product/product.module';
import { PriceModule } from '../price/price.module';
import { OrderProductService } from '../product/orderProduct.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDeliver, OrderProduct]),
    AuthModule,
    OrderModule,
    ProductModule,
    PriceModule,
  ],
  providers: [OrderService, OrderProductService],
  controllers: [OrderController],
})
export class OrderModule {}
