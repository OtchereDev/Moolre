import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User, { UserSubscriber } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([User, UserSubscriber])],
})
export class UsersModule {}
