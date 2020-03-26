import { IsNotEmpty, IsEmail, IsString, IsEnum, ValidateIf, ValidateNested } from 'class-validator';
import { CreateCompanyDto } from '../../companies/dto/create-company.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum UserType {
  candidate = 'candidate',
  employer = 'employer',
}

export enum LoginType {
  email = 'email',
  facebook = 'facebook',
  instagram = 'instagram'
}

export class CreateUserDto {

  @ApiProperty({
    description: 'Only needed when loginType is \'email\'',
    format: 'email'
  })
  @ValidateIf(user => user.loginType === 'email')
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: ['candidate', 'employer'] })
  @IsEnum(UserType)
  @IsNotEmpty()
  readonly userType: string;

  @ApiProperty({ enum: ['email', 'facebook', 'instagram'] })
  @IsString()
  @IsNotEmpty()
  readonly loginType: string;

  password: string;

  @ApiProperty({
    description: 'Company details needed when userType is \'employer\''
  })
  @ValidateIf(user => user.userType === 'employer')
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCompanyDto)
  readonly company: CreateCompanyDto;

  @ApiProperty({
    description: 'Only needed when loginType is \'facebook\''
  })
  @ValidateIf(user => user.loginType === 'facebook')
  @IsString()
  @IsNotEmpty()
  readonly access_token: string;

}