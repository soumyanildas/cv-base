import { IsString, IsNotEmpty, IsNumber, IsEnum, ValidateNested, IsUrl, IsOptional, Min, Max, IsEmail } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { CreateUserStrengthDto } from "./create-userStrength.dto";
import { CreateUserSkillDto } from "./create-userSkill.dto";
import { CreateUserJobTypeDto } from "./create-userJobType.dto";
import { CreateUserEmploymentHistoryDto } from "./create-userEmploymentHistory.dto";

export enum Gender {
  male = 'male',
  female = 'female'
}

export class UpdateUserDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly mobile: number;

  @ApiProperty()
  @IsNumber()
  @Min(1901)
  @Max(2155)
  @IsOptional()
  readonly birthYear: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly city: string;

  @ApiProperty({ enum: ['male', 'female'] })
  @IsEnum(Gender)
  @IsOptional()
  readonly gender: Gender;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly jobStatus: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly about: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  readonly profilePicture: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  readonly cvLink: string;

  @ApiPropertyOptional({ type: [CreateUserStrengthDto] })
  @ValidateNested()
  @Type(() => CreateUserStrengthDto)
  readonly strengths: CreateUserStrengthDto[];

  @ApiPropertyOptional({ type: [CreateUserSkillDto] })
  @ValidateNested()
  @Type(() => CreateUserSkillDto)
  readonly skills: CreateUserSkillDto[];

  @ApiPropertyOptional({ type: [CreateUserJobTypeDto] })
  @ValidateNested()
  @Type(() => CreateUserJobTypeDto)
  readonly jobTypes: CreateUserJobTypeDto[];

  @ApiPropertyOptional({ type: [CreateUserEmploymentHistoryDto] })
  @ValidateNested()
  @Type(() => CreateUserEmploymentHistoryDto)
  readonly employmentHistories: CreateUserEmploymentHistoryDto[];

}