import { IsString, IsUrl, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCompanyAdminDto {

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly companyName: string;

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