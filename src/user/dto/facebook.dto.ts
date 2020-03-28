import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";


export class FacebookDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  access_token: string;

}