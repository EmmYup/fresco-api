import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { OrderProduct } from '../order/entities/orderProduct.entity';

enum UnitType {
  kilogramo = 'KILOGRAMO',
  miligramo = 'MILIGRAMO',
  litros = 'LITRO',
  mililitro = 'MILILITRO',
}

@Entity()
export class Price extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: true })
  active: Boolean;

  @Column()
  price: number;

  @Column()
  amount: number;

  @Index()
  @Column({
    type: 'enum',
    enum: UnitType,
  })
  unitType: UnitType;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateAt: Date;

  @ManyToOne(
    type => Product,
    product => product.id,
  )
  product: Product;

  /*@OneToMany(
    type => OrderProduct,
    orderProduct => orderProduct.,
  )
  orderProducts: OrderProduct[];*/
}
