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
import { Payment } from './payment.entity';
import { PaymentService } from './payment.service';

@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('payment')
export class PaymentController {
  constructor(private readonly _paymentService: PaymentService) {}
}
