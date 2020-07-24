import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToMany,
  Index,
} from 'typeorm';
import { Order } from '../order/entities/order.entity';

export enum Type {
  oxxo = 'OXXO_DEPOSIT',
  cash = 'CASH',
}
@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @Column({
    type: 'enum',
    enum: Type,
  })
  type: Type;

  @Column()
  referenceCode: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateAt: Date;

  @OneToOne(type => Order)
  order: Order;
}
