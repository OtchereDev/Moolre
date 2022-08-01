import CartItem from 'src/cart/entity/cartItem';
import Product from 'src/products/entity/products.entity';
import User from 'src/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'double precision' })
  amountPaid: number;

  @ManyToMany(() => CartItem)
  @JoinTable()
  products: CartItem[];

  @ManyToOne(() => User, (u) => u.payments)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
