import { IsString, IsNotEmpty, IsBoolean, ValidateIf, IsISO8601, IsOptional } from "class-validator";
import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

export class CreateUserEmploymentHistoryDto {

  @ApiPropertyOptional({ description: 'Id of the employment history when updating' })
  @IsString()
  @IsOptional()
  readonly id: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly position: string;

  @ApiProperty({ description: 'date format is \'yyyy-MM-dd\''})
  @IsISO8601()
  @IsNotEmpty()
  readonly startDate: string;

  @ApiProperty({ description: 'End date is needed when isCurrentJob is \'false\'. date format is \'yyyy-MM-dd\''})
  @ValidateIf(employment => !employment.isCurrentJob)
  @IsISO8601()
  @IsNotEmpty()
  readonly endDate: string;

  @ApiPropertyOptional()
  @IsBoolean()
  readonly isCurrentJob: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly companyName: string;

}

