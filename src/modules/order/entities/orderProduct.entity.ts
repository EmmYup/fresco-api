import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '../../product/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderProduct extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(type => Product)
  product: Product;

  @Column()
  amount: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateAt: Date;

  @ManyToOne(
    type => Order,
    order => order.orderProducts,
  )
  @JoinColumn()
  order: Order;
}
