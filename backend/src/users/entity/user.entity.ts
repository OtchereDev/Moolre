import Cart from 'src/cart/entity/cart.entity';
import Payment from 'src/payments/entity/payments.entity';
import {
  AfterInsert,
  BaseEntity,
  Column,
  CreateDateColumn,
  DataSource,
  Entity,
  EntitySubscriberInterface,
  EventSubscriber,
  getConnection,
  getRepository,
  InsertEvent,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  fullName: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  jwt: string;

  @OneToMany(() => Payment, (p) => p.user)
  payments: Payment[];

  @OneToOne(() => Cart, (c) => c.user)
  @JoinColumn()
  cart: Cart;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  // @AfterInsert()
  // async createCartAfterSave() {
  //   const cart = new Cart();
  //   cart.user = this;

  //   await cart.save();
  // }
}

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async afterInsert(event: InsertEvent<User>) {
    const userCart = new Cart();

    userCart.user = event.entity;

    console.log('uu:', event.entity);

    const cart = await userCart.save();

    console.log('ccc:', cart);
  }
}
