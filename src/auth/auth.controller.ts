import { Controller, Post, Res, HttpStatus, Body, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from '../users/dto/login.dto';
import { MysqlExceptionFilter } from '../filters/mysql-exception.filter';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({
    description: 'Register a user. User can have userType as "candidate" or "employer". If "employer" then company details is required. User signed up with facebook already are logged in the next time.'
  })
  @Post('register')
  @UseFilters(MysqlExceptionFilter)
  async register(@Body() createUserDto: CreateUserDto, @Res() res: any) {
    if (createUserDto.loginType === 'email') {
      const response = await this.authService.register(createUserDto);
      if (response) {
        // delete response.password;
        return res.status(HttpStatus.OK).json({
          statusCode: 200,
          message: 'Successfully registered user.',
          response
        });
      }
    } else {
      const response = await this.authService.facebookRegister(createUserDto);
      if (response) {
        // delete response.password;
        delete response.access_token;
        return res.status(HttpStatus.OK).json({
          statusCode: 200,
          message: 'Successfully registered user.',
          response
        });
      }
    }
  }

  @ApiOperation({
    description: 'Login a user who have signed up via email.'
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: any) {
    const response = await this.authService.login(loginDto);
    if (response) {
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'Successfully logged in.',
        response
      });
    }
  }

}