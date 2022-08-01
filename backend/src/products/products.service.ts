import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCreateDTO } from './dto/product.dto';
import Product from './entity/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async productCreate(body: ProductCreateDTO) {
    const product = await this.productRepo
      .create({
        productName: body.productName,
        price: body.price,
        imageUrl: body.imageUrl,
      })
      .save();

    return {
      message: 'Product successfully created',
      data: {
        product,
      },
    };
  }

  async getAllProducts() {
    const products = await this.productRepo.find({});

    return {
      message: 'Product successfully fetched',
      data: {
        products,
      },
    };
  }
}
