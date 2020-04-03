import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddDeviceDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  deviceId: string

}