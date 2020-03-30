import { IsString, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateJobListingDto {

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly jobName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly jobCategory: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly city: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly employmentForm: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly jobDescription: string;

}