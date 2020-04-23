import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class ImageUploadDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly base64: string;

}