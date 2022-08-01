import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PaymentsService } from './payments.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import MessageDTO from 'src/auth/response/message.response';

@Controller('payments')
@ApiTags('Payments')
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ type: MessageDTO, status: 200 })
  async handlePayment(@Req() req: any): Promise<MessageDTO> {
    return this.paymentService.handlePayment(req.user);
  }
}
