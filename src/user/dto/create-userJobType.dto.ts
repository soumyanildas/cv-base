import { IsString, IsNotEmpty, IsNumber, Min, Max } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserJobTypeDto {

  @ApiProperty({ description: 'Id of the jobType' })
  @IsString()
  @IsNotEmpty()
  readonly jobType: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  readonly experience: number;

}