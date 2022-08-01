import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CartService } from './cart.service';
import CartBodyDTO from './dto/cart-body.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import CartResponse from './response/cart.response';
import MessageDTO from 'src/auth/response/message.response';

@Controller('cart')
@ApiTags('Cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ type: CartResponse, status: 200 })
  async getUserCart(@Req() req: any): Promise<CartResponse> {
    return await this.cartService.getUserCart(req.user);
  }

  @Post('update')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @ApiResponse({ type: MessageDTO, status: 200 })
  async addToCart(
    @Req() req: any,
    @Body() body: CartBodyDTO,
  ): Promise<MessageDTO> {
    return await this.cartService.updateCart(body, req.user);
  }
}
