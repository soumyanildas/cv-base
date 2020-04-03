import { IsString, IsOptional, IsISO8601, MinDate } from "class-validator";
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

  @ApiPropertyOptional()
  @IsISO8601()
  @IsOptional()
  @MinDate(new Date(), { message: `minimal allowed date for lastApplicationDate is ${new Date().toISOString().split('T')[0]}`})
  readonly lastApplicationDate: string;

}