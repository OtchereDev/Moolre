import { ApiProperty } from '@nestjs/swagger';
import User from 'src/users/entity/user.entity';

export class LoginResponse {
  @ApiProperty()
  access_token: string;

  @ApiProperty({ type: User })
  user: User;
}
