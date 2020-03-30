import { IsString, IsOptional } from "class-validator";
import { User } from "../entities/user.entity";
import { JobListing } from "src/company/entities/jobListing.entity";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserJobInterestDto {

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  coverLetter: string;

  user: User;

  jobListing: JobListing;
  
}