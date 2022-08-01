import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import SignUpDTO from 'src/auth/dto/signup.dto';
import { Repository } from 'typeorm';
import User from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findOne(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  async signup(body: SignUpDTO) {
    const user = await this.userRepo.findOne({ where: { email: body.email } });

    if (user) {
      throw new BadRequestException({
        message: 'User with this email already exists',
      });
    }

    const salt = 10;

    const hashPassword = bcrypt.hashSync(body.password, salt);

    await this.userRepo
      .create({
        email: body.email,
        fullName: body.fullName,
        password: hashPassword,
      })
      .save();

    return {
      message: 'User successfully created',
    };
  }

  async addJwtToUser(userId: string, token: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (user) {
      user.jwt = token;
      await this.userRepo.update({ id: userId }, user);
    }

    return;
  }
}
