import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";


export class FacebookDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly access_token: string;

}