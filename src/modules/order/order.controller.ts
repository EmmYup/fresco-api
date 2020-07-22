import {
  Controller,
  Post,
  Put,
  Get,
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

  @Get(':orderId')
  async show(@Param('orderId') orderId): Promise<Order> {
    const order = await this._orderService.byId(orderId);
    return order;
  }

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
    orderProduct.unitPrice = productPrice.price;
    orderProduct.totalPrice = productPrice.price * order.amount;
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
    const productPrice = await this._priceService.lastPriceByProduct(
      product.productId,
    );

    if (!requestedProduct) throw new NotFoundException('Invalid ProductId');
    const orderProduct: OrderProduct = new OrderProduct();
    orderProduct.amount = product.amount;
    orderProduct.product = requestedProduct;
    orderProduct.unitPrice = productPrice.price;
    orderProduct.totalPrice = productPrice.price * product.amount;
    orderProduct.order = order;

    try {
      return await orderProduct.save();
    } catch (error) {
      throw new Error(`Invalid ProductId: ${error}`);
    }
  }

  @Post(':orderId/confirm')
  async confirmOrder(@Param('orderId') orderId) {
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
    // const requestedProduct = await this._productService.byId(product.productId);

    if (!order) throw new NotFoundException('Invalid OrderId');
    // if (!requestedProduct) throw new NotFoundException('Invalid ProductId');

    const requestedOrderProduct = await this._orderProductService.byOrderProductId(
      order.id,
      product.orderProductId,
    );
    if (!requestedOrderProduct)
      throw new NotFoundException('Product does not exist on order');

    try {
      await requestedOrderProduct.remove();
      return await this._orderService.byId(orderId);
    } catch (err) {
      throw new Error(`Delete Error: ${err}`);
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
    order.status = OrderStatus.inDeliveryProcess;
    //Validar precio???
    try {
      await order.save();
      return await this._orderService.byId(orderId);
    } catch (error) {
      throw new Error(`Deliver error: ${error}`);
    }
  }
}
