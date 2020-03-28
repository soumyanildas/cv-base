import { IsString, IsNotEmpty, IsBoolean, ValidateIf, IsISO8601 } from "class-validator";
import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

export class CreateUserEmploymentHistoryDto {

  @ApiPropertyOptional({ description: 'Id of the employment history when updating' })
  @IsString()
  id: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({ description: 'date format is \'yyyy-MM-dd\''})
  @IsISO8601()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ description: 'End date is needed when isCurrentJob is \'false\'. date format is \'yyyy-MM-dd\''})
  @ValidateIf(employment => !employment.isCurrentJob)
  @IsISO8601()
  @IsNotEmpty()
  endDate: string;

  @ApiPropertyOptional()
  @IsBoolean()
  isCurrentJob: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  companyName: string;

}

