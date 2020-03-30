import { IsString, IsNotEmpty, IsOptional } from "class-validator";
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

  company: UpdateCompanyDto;

}