import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Cart from 'src/cart/entity/cart.entity';
import CartItem from 'src/cart/entity/cartItem';
import User from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import Payment from './entity/payments.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
  ) {}

  async handlePayment(user: User) {
    const cart = await this.cartRepo.findOne({
      where: { user: { email: user.email } },
      relations: ['cartItems', 'cartItems.product'],
    });

    const cartTotal = cart.cartItems.reduce(
      (p, curr) => p + curr.quantity * curr.product.price,
      0,
    );

    if (cartTotal <= 0) {
      throw new BadRequestException({ message: 'No products in cart ' });
    }

    const userObj = await this.userRepo.findOne({
      where: { email: user.email },
    });

    const payment = await this.paymentRepo
      .create({
        user: userObj,
        amountPaid: cartTotal,
        products: cart.cartItems,
      })
      .save();

    // clear cart after payments
    await this.cartItemRepo.remove(cart.cartItems);

    console.log('payment:', payment);

    return {
      message: 'Payment for products was successful',
    };
  }
}
