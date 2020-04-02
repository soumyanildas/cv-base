import { IsString, IsNumber, IsEnum, IsOptional, IsBoolean, MinDate, Min, Max } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export enum Gender {
  male = 'male',
  female = 'female'
}

export class UpdateUserAdminDto {

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly firstName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly lastName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly email: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  readonly mobile: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(1901)
  @Max(2155)
  @IsOptional()
  readonly birthYear: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly city: string;

  @ApiPropertyOptional({ enum: ['male', 'female'] })
  @IsEnum(Gender)
  @IsOptional()
  readonly gender: Gender;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly about: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  readonly isActive: boolean;

}