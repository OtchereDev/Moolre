import { ApiProperty } from '@nestjs/swagger';

export default class UploaderDTO {
  @ApiProperty()
  file: string;
}
