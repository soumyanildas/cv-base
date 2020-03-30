import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserJobTypeDto {

  @ApiProperty({ description: 'Id of the jobType' })
  @IsString()
  @IsNotEmpty()
  readonly jobType: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly experience: number;

}