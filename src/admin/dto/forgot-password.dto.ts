import { IsNotEmpty, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordDto {

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

}