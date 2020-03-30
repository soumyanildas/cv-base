import { IsString, IsNumber, IsEnum, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export enum Gender {
  male = 'male',
  female = 'female'
}

export class UpdateUserDto {

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

}