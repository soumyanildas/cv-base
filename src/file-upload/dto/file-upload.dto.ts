import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class FileUploadDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly base64: string;
}