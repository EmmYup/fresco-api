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
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PaymentRsDto } from './dto/paymentRs.dto';
import { Payment, Types } from './payment.entity';
import { Order, OrderStatus } from '../order/entities/order.entity';
import { PaymentService } from './payment.service';
import { OrderService } from '../order/order.service';

@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly _paymentService: PaymentService,
    private readonly _orderService: OrderService,
  ) {}

  @Post(':orderId/payment')
  async save(
    @Param('orderId') orderId,
    @Body() payment: PaymentRsDto,
    @Request() req,
  ) {
    try {
      const newPayment: Payment = new Payment();

      newPayment.type = payment.type === 'cash' ? Types.cash : Types.oxxo;
      newPayment.referenceCode = payment.referenceCode;
      await newPayment.save();

      const order = await this._orderService.byId(orderId);
      order.status = OrderStatus.paymentChoosen;
      order.payment = newPayment;
      await order.save();
      return await this._orderService.byId(orderId);
    } catch (err) {
      throw new Error(`Error creating payment: ${err}`);
    }
  }
  @Put(':orderId/payment/:paymentId')
  async update(
    @Param('paymentId') paymentId,
    @Param('orderId') orderId,
    @Body() payment: PaymentRsDto,
    @Request() req,
  ) {
    try {
      const paymentToUpdate: Payment = await this._paymentService.byId(
        paymentId,
      );
      paymentToUpdate.type = payment.type === 'cash' ? Types.cash : Types.oxxo;
      paymentToUpdate.referenceCode = payment.referenceCode;
      await paymentToUpdate.save();

      const order = await this._orderService.byId(orderId);
      if (paymentToUpdate.type === Types.oxxo) {
        order.status = OrderStatus.payed;
      }
      order.payment = paymentToUpdate;
      await order.save();
      return await this._orderService.byId(orderId);
    } catch (err) {}
  }
}
