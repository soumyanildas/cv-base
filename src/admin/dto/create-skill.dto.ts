import { IsString, IsNotEmpty } from "class-validator";

export class CreateSkillDto {

  @IsString()
  @IsNotEmpty()
  skillName: string;

}