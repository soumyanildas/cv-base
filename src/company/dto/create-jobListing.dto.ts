import { IsString, IsNotEmpty, IsOptional, IsISO8601, MinDate } from "class-validator";
import { UpdateCompanyDto } from "./update-company.dto";
import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

export class CreateJobListingDto {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly jobName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly jobCategory: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly employmentForm: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly jobDescription: string;

  @ApiProperty()
  @IsISO8601()
  @MinDate(new Date(), { message: `minimal allowed date for lastApplicationDate is ${new Date().toISOString().split('T')[0]}`})
  readonly lastApplicationDate: string;

  company: UpdateCompanyDto;

}