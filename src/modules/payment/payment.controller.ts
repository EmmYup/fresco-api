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

@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('order')
export class PaymentController {}
