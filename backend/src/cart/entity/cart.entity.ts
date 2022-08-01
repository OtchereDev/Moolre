import Product from 'src/products/entity/products.entity';
import User from 'src/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CartItem from './cartItem';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export default class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @OneToMany(() => CartItem, (c) => c.cart)
  @ApiProperty({ type: [CartItem] })
  cartItems: CartItem[];

  @OneToOne(() => User, (u) => u.cart)
  user: User;
}
