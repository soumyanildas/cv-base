import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class FileUploadDto {

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  readonly file: any;
}