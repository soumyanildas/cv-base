import { IsString, IsNotEmpty, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export enum RecommendationType {
  text = 'text',
  sound = 'sound'
}

export class UpdateRecommendationDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly recommendation: string;

  @ApiProperty({ enum: ['text', 'sound'] })
  @IsEnum(RecommendationType)
  @IsNotEmpty()
  readonly recommendationType: string;

}