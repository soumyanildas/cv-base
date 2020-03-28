import { IsString, IsNotEmpty } from "class-validator";


export class CreateAdminDto {

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  password: string;

}