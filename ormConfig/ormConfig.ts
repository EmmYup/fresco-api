import { ConnectionOptions } from 'typeorm';
require('dotenv').config();
import * as fs from 'fs';
import { Price } from '../src/modules/price/price.entity';
import { User } from '../src/modules/user/user.entity';
import { Product } from '../src/modules/product/product.entity';
import { Payment } from '../src/modules/payment/payment.entity';
import { Order } from '../src/modules/order/entities/order.entity';
import { OrderProduct } from '../src/modules/order/entities/orderProduct.entity';
import { OrderDeliver } from '../src/modules/order/entities/orderDeliver.entity';

// Check typeORM documentation for more information.
const config: ConnectionOptions = {
  name: 'default',
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Price, User, Product, Payment, Order, OrderProduct, OrderDeliver],

  // We are using migrations, synchronize should be set to false.
  synchronize: true,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: true,
  logger: 'file',
  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [__dirname + '/migrations/api/**/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations/api',
  },
};

export = config;
