import { IsNotEmpty, IsEmail, IsString, IsEnum, ValidateIf, ValidateNested } from 'class-validator';
import { CreateCompanyDto } from '../../company/dto/create-company.dto';
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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: ['candidate', 'employer'] })
  @IsEnum(UserType)
  @IsNotEmpty()
  readonly userType: UserType;

  @ApiProperty({ enum: ['email', 'facebook', 'instagram'] })
  @IsString()
  @IsNotEmpty()
  readonly loginType: LoginType;

  password: string;

  @ApiProperty({
    description: 'Company details needed when userType is \'employer\''
  })
  @ValidateIf(user => user.userType === 'employer')
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCompanyDto)
  readonly company: CreateCompanyDto;

}