import { IsNotEmpty, IsString, IsUrl, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCompanyDto {

  @ApiProperty()  
  @IsString()
  @IsNotEmpty()
  readonly companyName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
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