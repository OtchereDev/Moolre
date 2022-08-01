import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export default class Product extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty()
  productName: string;

  @Column({ type: 'double precision' })
  @ApiProperty()
  price: number;

  @Column()
  @ApiProperty()
  imageUrl: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;
}
