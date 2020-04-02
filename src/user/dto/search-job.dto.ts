import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SearchJobDto {

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly city: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly jobCategory: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly employmentForm: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly searchQuery: string;

}