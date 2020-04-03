import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Res, HttpStatus, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes, ApiBody, ApiExcludeEndpoint, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { diskStorage } from 'multer'
import { extname } from 'path'
import { AuthGuard } from '@nestjs/passport';
import { FileUploadDto } from './file-upload.dto';

@Controller()
export class FileUploadController {

  SERVER_URL: string;

  constructor() {
    this.SERVER_URL = 'http://localhost:4000/';
  }

  @ApiTags('general')
  @Post('api/v1/uploadFile')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload image or video here',
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
  @UseGuards(AuthGuard('jwt'))
  @Get('uploads/:fileId')
  async serveImage(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'uploads' });
  }


}
