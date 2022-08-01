import Product from '../entity/products.entity';
import { ApiProperty } from '@nestjs/swagger';

class ProductType {
  @ApiProperty({ type: Product })
  product: Product;
}

class ProductsType {
  @ApiProperty({ type: [Product] })
  products: Product[];
}

export class ProductResponse {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: ProductType })
  data: ProductType;
}

export class AllProductResponse {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: ProductsType })
  data: ProductsType;
}
