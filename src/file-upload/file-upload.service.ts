import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FileUploadDto } from './dto/file-upload.dto';
import * as fs from 'fs';
import { getExtension } from 'mime';

@Injectable()
export class FileUploadService {

  async uploadFile(fileUploadDto: FileUploadDto): Promise<any> {
    try {
      const decodedImg = this.decodeBase64Image(fileUploadDto.base64);
      const base64 = decodedImg.data;
      const type = decodedImg.type;
      const extension = getExtension(type);
      const path = './uploads/' + Date.now() + '.' + extension;
      fs.writeFileSync(path, base64, { encoding: 'base64' });
      return path.slice(2);
    } catch (error) {
      throw new HttpException(error.message || 'Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private decodeBase64Image(dataString) {
    const matches = dataString.split(",");
    const response: any = {};

    response.type = matches[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0];
    response.data = matches[1];

    return response;
  }
}
