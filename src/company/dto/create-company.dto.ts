import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly companyName: string;

}