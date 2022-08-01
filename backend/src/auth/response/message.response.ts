import { ApiProperty } from '@nestjs/swagger';

export default class MessageDTO {
  @ApiProperty()
  message: string;
}
