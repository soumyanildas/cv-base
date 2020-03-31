import { IsString, IsUrl, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum LicenseType {
  standard = 'standard',
  premium = 'premium'
}

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

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  readonly isActive: boolean;

  @ApiPropertyOptional({ enum: ['standard', 'premium'] })
  @IsEnum(LicenseType)
  @IsOptional()
  readonly licenseType: string;

}