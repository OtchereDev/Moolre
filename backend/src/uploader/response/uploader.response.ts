import { ApiProperty } from '@nestjs/swagger';

export default class UploaderResponse {
  @ApiProperty()
  imageUrl: string;
}
