import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserStrengthDto {
  
  @ApiProperty({ description: 'Id of the strength' })
  @IsString()
  @IsNotEmpty()
  readonly strength: string;

}