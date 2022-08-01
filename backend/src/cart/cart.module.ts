import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import Cart from './entity/cart.entity';
import CartItem from './entity/cartItem';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [TypeOrmModule.forFeature([Cart, CartItem]), ProductsModule],
  exports: [TypeOrmModule],
})
export class CartModule {}
