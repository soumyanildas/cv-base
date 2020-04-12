import { IsString, IsNotEmpty, IsUrl, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserSkillDto {
  
  @ApiProperty({ description: 'Id of the skill' })  @IsString()
  @IsNotEmpty()
  readonly skill: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly comment: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  readonly media: string;
}