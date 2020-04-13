import { IsString, IsNotEmpty, IsUrl, IsOptional, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export enum mediaType {
  video = 'video',
  image = 'image'
};

export class CreateUserSkillDto {

  @ApiProperty({ description: 'Id of the skill' }) @IsString()
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

  @ApiPropertyOptional({ enum: ['video', 'image'] })
  @IsEnum(mediaType)
  @IsOptional()
  readonly mediaType: string;
}