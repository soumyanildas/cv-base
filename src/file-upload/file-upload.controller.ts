import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Res, HttpStatus, Get, Param, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes, ApiBody, ApiExcludeEndpoint, ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer'
import { extname } from 'path'
import { AuthGuard } from '@nestjs/passport';
import { FileUploadDto } from './dto/file-upload.dto';
import { config } from '../common/config';
import { FileUploadService } from './file-upload.service';
import { ImageUploadDto } from './dto/image-upload.dto';

@Controller('api/v1')
export class FileUploadController {

  SERVER_URL: string;

  constructor(
    private readonly fileUploadService: FileUploadService
  ) {
    this.SERVER_URL = config.baseURL;
  }

  @ApiTags('general')
  @Post('uploadImage')
  @ApiOperation({
    description: 'Upload image here'
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async uploadImage(@Body() imageUploadDto: ImageUploadDto, @Res() res: any) {
    const response = await this.fileUploadService.uploadImage(imageUploadDto);
    return res.status(HttpStatus.OK).json({
      path: `${this.SERVER_URL}${response}`
    });
  }

  @ApiTags('general')
  @Post('uploadFile')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload audio, video or pdf file here',
    type: FileUploadDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        // Generating a 32 random chars long string
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        //Calling the callback passing the random name generated with the original extension name
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  uploadFile(@UploadedFile() file, @Res() res: any) {
    return res.status(HttpStatus.OK).json({
      path: `${this.SERVER_URL}${file.path}`
    });
  }

  @ApiExcludeEndpoint()
  @Get('uploads/:fileId')
  async serveImage(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'uploads' });
  }


}
