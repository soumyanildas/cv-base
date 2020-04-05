import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Max } from "class-validator";
import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

export class SearchCandidateDto {

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly jobTypes: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly jobStatus: string;
  
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly candidateName: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  readonly experience: number;

}