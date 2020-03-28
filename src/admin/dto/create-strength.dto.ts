import { IsString, IsNotEmpty } from "class-validator";

export class CreateStrengthDto {

  @IsString()
  @IsNotEmpty()
  strengthName: string;

}