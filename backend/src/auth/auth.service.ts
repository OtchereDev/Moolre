import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import SignUpDTO from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import User from 'src/users/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);

    console.log('uuu:', user, email, password);
    if (!user) return null;

    let isSamePassword = bcrypt.compareSync(password, user?.password);

    if (user && isSamePassword) {
      const { password, jwt, ...data } = user;

      return data;
    }

    return null;
  }

  async signup(body: SignUpDTO) {
    return await this.userService.signup(body);
  }

  async login(user: User) {
    const payload = { username: user.fullName, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    await this.userService.addJwtToUser(user.id, access_token);

    return {
      access_token,
      user,
    };
  }
}
