import { IsString, IsNotEmpty, IsUrl } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserSkillDto {
  
  @ApiProperty({ description: 'Id of the skill' })  @IsString()
  @IsNotEmpty()
  readonly skill: string;

  @ApiPropertyOptional()
  @IsString()
  readonly comment: string;

  @ApiPropertyOptional()
  @IsUrl()
  readonly media: string;
}