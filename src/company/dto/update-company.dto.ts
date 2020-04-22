import { IsNotEmpty, IsString, IsUrl, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCompanyDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly companyName: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  readonly mobile: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly email: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly city: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  readonly profilePicture: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  readonly homePage: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  readonly facebook: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  readonly instagram: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly about: string;

}