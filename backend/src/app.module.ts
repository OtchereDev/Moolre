import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UploaderModule } from './uploader/uploader.module';
import { ProductsModule } from './products/products.module';
import { PaymentsModule } from './payments/payments.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import connectionOptions from './db/connection';
import { JwtModule } from '@nestjs/jwt';
import { CartModule } from './cart/cart.module';
import { UserSubscriber } from './users/entity/user.entity';

@Module({
  imports: [
    UploaderModule,
    TypeOrmModule.forRoot({
      ...connectionOptions,
      autoLoadEntities: true,
      subscribers: [UserSubscriber],
    }),
    ProductsModule,
    PaymentsModule,
    UsersModule,
    AuthModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
