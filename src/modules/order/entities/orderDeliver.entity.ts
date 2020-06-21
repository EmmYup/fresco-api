import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Order } from './order.entity';
import { type } from 'os';

@Entity()
export class OrderDeliver extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(
    type => Order,
    order => order.id,
  )
  order: Order;

  @Column()
  phone: string;

  @Column()
  direction: string;

  @Column({ name: 'postal_code' })
  postalCode: string;

  @Column({ name: 'extra_comments' })
  extraComments: string;

  @Column('decimal', { precision: 9, scale: 6 })
  latitude: number;

  @Column('decimal', { precision: 9, scale: 6 })
  longitude: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateAt: Date;
}
