import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserJobTypeDto {

  @ApiProperty({ description: 'Id of the jobType' })
  @IsString()
  @IsNotEmpty()
  jobType: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  experience: number;

}