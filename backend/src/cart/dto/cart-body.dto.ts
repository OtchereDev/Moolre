import { IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CartBodyDTO {
  @ApiProperty()
  @IsUUID()
  productId: string;

  @Min(0)
  @ApiProperty()
  quantity: number;
}
