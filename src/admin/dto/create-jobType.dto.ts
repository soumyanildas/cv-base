import { IsString, IsNotEmpty } from "class-validator";

export class CreateJobTypeDto {

  @IsString()
  @IsNotEmpty()
  jobTypeName: string;

}