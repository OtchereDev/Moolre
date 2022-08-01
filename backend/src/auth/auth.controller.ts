import {
  Controller,
  Post,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import SignUpDTO from './dto/signup.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { LoginResponse } from './response/auth.responses';
import MessageDTO from './response/message.response';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiResponse({ status: 201, type: LoginResponse })
  async login(@Req() req): Promise<LoginResponse> {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @UsePipes(ValidationPipe)
  @ApiResponse({ status: 201, type: MessageDTO })
  async signup(@Body() body: SignUpDTO): Promise<MessageDTO> {
    return await this.authService.signup(body);
  }
}
