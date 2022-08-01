import { IsNotEmpty, IsNumber, IsUrl, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductCreateDTO {
  @IsNotEmpty()
  @ApiProperty()
  productName: string;

  @IsNumber()
  @Min(1)
  @ApiProperty()
  price: number;

  @IsUrl()
  @ApiProperty()
  imageUrl: string;
}
