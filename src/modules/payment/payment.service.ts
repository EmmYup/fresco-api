import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly _paymentRepo: Repository<Payment>,
  ) {}
  async byId(id: number) {
    return await this._paymentRepo.findOneOrFail({
      where: { id },
    });
  }
}
