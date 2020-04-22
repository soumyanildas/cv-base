import { Controller, Post, UseGuards, Res, HttpStatus, Get, Param, Body } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileUploadDto } from './dto/file-upload.dto';
import { config } from '../common/config';
import { FileUploadService } from './file-upload.service';

@Controller('api/v1')
export class FileUploadController {

  SERVER_URL: string;

  constructor(
    private readonly fileUploadService: FileUploadService
  ) {
    this.SERVER_URL = config.baseURL;
  }

  @ApiTags('general')
  @Post('uploadFile')
  @ApiOperation({
    description: 'Upload image or video here'
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async uploadFile(@Body() fileUploadDto: FileUploadDto, @Res() res: any) {
    const response = await this.fileUploadService.uploadFile(fileUploadDto);
    return res.status(HttpStatus.OK).json({
      path: `${this.SERVER_URL}${response}`
    });
  }

  @ApiExcludeEndpoint()
  @Get('uploads/:fileId')
  async serveImage(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'uploads' });
  }


}
