import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderRqDto } from './dto/createOrderRqDto';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderProduct } from './entities/orderProduct.entity';
import { AddProductToOrderRqDto } from './dto/addProductToOrderRqDto';
import { ProductService } from '../product/product.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PriceService } from '../price/price.service';
import { Product } from '../product/product.entity';
import { OrderProductService } from '../product/orderProduct.service';
import { DeleteProductToOrderRqDto } from './dto/deleteProductToOrderRqDto';
import { OrderDeliver } from './entities/orderDeliver.entity';
import { CreateOrderDeliverRqDto } from './dto/createOrderDeliverRqDto';

@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('order')
export class OrderController {
  constructor(
    private readonly _orderService: OrderService,
    private readonly _productService: ProductService,
    private readonly _orderProductService: OrderProductService,
    private readonly _priceService: PriceService,
  ) {}

  @Post()
  async save(@Body() order: CreateOrderRqDto, @Request() req) {
    const newOrder: Order = new Order();

    const requestedProduct: Product = await this._productService.byId(
      order.productId,
    );

    if (!requestedProduct) throw new NotFoundException('Invalid ProductId');

    const productPrice = await this._priceService.lastPriceByProduct(
      order.productId,
    );

    const orderProduct = new OrderProduct();
    orderProduct.amount = order.amount;
    orderProduct.product = requestedProduct;
    await orderProduct.save();

    newOrder.totalPrice = productPrice.price * order.amount;
    newOrder.user = req.user.id;
    newOrder.orderProducts = [orderProduct];
    return await newOrder.save();
  }

  @Post(':orderId')
  async addProduct(
    @Param('orderId') orderId,
    @Body() product: AddProductToOrderRqDto,
  ) {
    const order: Order = await this._orderService.byId(orderId);
    const requestedProduct = await this._productService.byId(product.productId);

    if (!requestedProduct) throw new NotFoundException('Invalid ProductId');
    const orderProduct: OrderProduct = new OrderProduct();
    orderProduct.amount = product.amount;
    orderProduct.product = requestedProduct;
    orderProduct.order = order;

    try {
      await orderProduct.save();
    } catch (error) {
      throw new Error('Invalid ProductId');
    }
  }

  @Post(':orderId/confirm')
  async confirmProduct(@Param('orderId') orderId) {
    const order: Order = await this._orderService.byId(orderId);

    //Validar precio???
    order.status = OrderStatus.confirmed;
    try {
      order.save();
    } catch (error) {}
  }

  @Delete(':orderId')
  async deleteProduct(
    @Param('orderId') orderId,
    @Body() product: DeleteProductToOrderRqDto,
  ) {
    const order: Order = await this._orderService.byId(orderId);
    const requestedProduct = await this._productService.byId(product.productId);

    if (!order) throw new NotFoundException('Invalid OrderId');
    if (!requestedProduct) throw new NotFoundException('Invalid ProductId');

    const requestedOrderProduct = await this._orderProductService.byIdOrderAndProduct(
      order.id,
      product.productId,
    );
    if (!requestedOrderProduct)
      throw new NotFoundException('Product does not exist on order');

    try {
      await requestedOrderProduct.remove();
    } catch (error) {
      throw new Error('Delete Error');
    }
  }

  @Post(':orderId/deliver')
  async deliverProduct(
    @Param('orderId') orderId,
    @Body() deliverRq: CreateOrderDeliverRqDto,
  ) {
    const order: Order = await this._orderService.byId(orderId);
    if (!order) throw new NotFoundException('Invalid OrderId');

    const deliver = new OrderDeliver();
    deliver.phone = deliverRq.phone;
    deliver.direction = deliverRq.direction;
    deliver.postalCode = deliverRq.postalCode;
    deliver.extraComments = deliverRq.comments;
    deliver.latitude = deliverRq.latitude;
    deliver.longitude = deliverRq.longitude;
    await deliver.save();
    order.orderDeliver = deliver;
    //Validar precio???
    try {
      await order.save();
    } catch (error) {}
  }
}
