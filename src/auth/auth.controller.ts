import { Controller, Post, Res, HttpStatus, Body, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { MysqlExceptionFilter } from 'src/filters/mysql-exception.filter';
import { LoginDto } from 'src/users/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @UseFilters(MysqlExceptionFilter)
  async register(@Body() createUserDto: CreateUserDto, @Res() res: any) {
    if (createUserDto.loginType === 'email') {
      const response = await this.authService.register(createUserDto);
      if (response) {
        // delete response.password;
        return res.status(HttpStatus.OK).json({
          error: false,
          response
        });
      }
    } else {
      const response = await this.authService.facebookRegister(createUserDto);
      if (response) {
        // delete response.password;
        delete response.access_token;
        return res.status(HttpStatus.OK).json({
          error: false,
          response
        });
      }
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: any) {
    const response = await this.authService.login(loginDto);
    if (response) {
      return res.status(HttpStatus.OK).json({
        error: false,
        response
      });
    }
  }

}