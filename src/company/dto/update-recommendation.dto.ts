import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateRecommendationDto {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly recommendation: string;

}