import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploaderService } from './uploader.service';
import { ApiTags, ApiConsumes, ApiResponse, ApiBody } from '@nestjs/swagger';
import UploaderResponse from './response/uploader.response';
import UploaderDTO from './dto/uploader.dto';

@Controller('uploader')
@ApiTags('Uploader')
@ApiResponse({ type: UploaderResponse, status: 200 })
export class UploaderController {
  constructor(private uploaderService: UploaderService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploaderDTO })
  async uploadFileToFirebase(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({
            fileType: /[\/.](gif|jpg|jpeg|tiff|png|)$/i,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<UploaderResponse> {
    return await this.uploaderService.uploadFileToFirebase(file);
  }
}
