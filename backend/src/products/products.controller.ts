import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductCreateDTO } from './dto/product.dto';
import { ProductsService } from './products.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {
  AllProductResponse,
  ProductResponse,
} from './response/product.response';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiResponse({ type: ProductResponse, status: 200 })
  async productCreate(
    @Body() body: ProductCreateDTO,
  ): Promise<ProductResponse> {
    return await this.productService.productCreate(body);
  }

  @Get()
  @ApiResponse({ type: AllProductResponse, status: 200 })
  async getAllProducts(): Promise<AllProductResponse> {
    return await this.productService.getAllProducts();
  }
}
