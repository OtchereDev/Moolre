import Product from 'src/products/entity/products.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Cart from './cart.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export default class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @ManyToOne(() => Product, { cascade: true })
  @ApiProperty()
  product: Product;

  @Column()
  @ApiProperty()
  quantity: number;

  @ManyToOne(() => Cart, { cascade: true })
  cart: Cart;
}
