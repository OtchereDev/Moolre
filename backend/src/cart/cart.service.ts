import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Product from 'src/products/entity/products.entity';
import User from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import CartBodyDTO from './dto/cart-body.dto';
import Cart from './entity/cart.entity';
import CartItem from './entity/cartItem';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
    @InjectRepository(Product) private productsRepo: Repository<Product>,
  ) {}

  async getUserCart(user: User) {
    const cart = await this.cartRepo.findOne({
      where: { user: { email: user.email } },
      relations: ['cartItems', 'cartItems.product'],
      loadEagerRelations: true,
    });

    const cartTotal = cart.cartItems.reduce(
      (p, curr) => p + curr.quantity * curr.product.price,
      0,
    );

    return { cart, cartTotal, message: 'Cart successfully fetched' };
  }

  async updateCart(cartBody: CartBodyDTO, user: User) {
    const userCart = await this.cartRepo.findOne({
      where: { user: { email: user.email } },
      relations: ['cartItems', 'cartItems.product'],
    });
    let cart = userCart.cartItems.find(
      (item) => item.product.id == cartBody.productId,
    );

    let message;

    if (cart) {
      if (cartBody.quantity == 0) {
        await cart.remove();

        message = 'Product successfully removed to cart';
      }
      cart.quantity = cartBody.quantity;
      await cart.save();
    } else {
      if (cartBody.quantity == 0) {
        await cart.remove();
        throw new BadRequestException({
          message: 'Product quantity cannot be 0',
        });
      }

      const product = await this.productsRepo.findOne({
        where: { id: cartBody.productId },
      });

      cart = new CartItem();

      cart.product = product;
      cart.quantity = cartBody.quantity;

      cart.cart = userCart;

      await cart.save();
    }
    const cartObj = await this.cartRepo.findOne({
      where: { user: { email: user.email } },
      relations: ['cartItems', 'cartItems.product'],
      loadEagerRelations: true,
    });

    const cartTotal = cartObj.cartItems.reduce(
      (p, curr) => p + curr.quantity * curr.product.price,
      0,
    );
    return {
      message: message || 'Product successfully added to cart',
      cartTotal,
    };
  }
}
