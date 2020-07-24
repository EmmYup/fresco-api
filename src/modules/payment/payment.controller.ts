import {
  Controller,
  Post,
  Put,
  Param,
  Body,
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

      newPayment.type = Types[payment.type];
      newPayment.referenceCode = payment.referenceCode;
      await newPayment.save();

      const order: Order = await this._orderService.byId(orderId);
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
      paymentToUpdate.type = Types[payment.type];
      paymentToUpdate.referenceCode = payment.referenceCode;
      await paymentToUpdate.save();

      const order: Order = await this._orderService.byId(orderId);
      if (paymentToUpdate.type === Types.oxxo) {
        order.status = OrderStatus.payed;
      }
      order.payment = paymentToUpdate;
      await order.save();
      return await this._orderService.byId(orderId);
    } catch (err) {
      throw new Error(`Error updating payment: ${err}`);
    }
  }
}
