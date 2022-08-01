import Cart from '../entity/cart.entity';
import { ApiProperty } from '@nestjs/swagger';

export default class CartResponse {
  @ApiProperty({ type: Cart })
  cart: Cart;

  @ApiProperty()
  cartTotal: number;

  @ApiProperty()
  message: string;
}
