import { Controller, Post, Res, HttpStatus, Body, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from '../user/dto/login.dto';
import { MysqlExceptionFilter } from '../filters/mysql-exception.filter';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FacebookDto } from 'src/user/dto/facebook.dto';
import { ForgotPasswordDto } from 'src/company/dto/forgot-password.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiTags('auth')
  @ApiOperation({
    description: 'Register a user. User can have userType as "candidate" or "employer". If "employer" then company details is required.'
  })
  @Post('user/register')
  @UseFilters(MysqlExceptionFilter)
  async register(@Body() createUserDto: CreateUserDto, @Res() res: any) {
    const response = await this.authService.register(createUserDto);
    delete response.password;
    if (response) {
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        response
      });
    }
  }

  @ApiTags('auth')
  @ApiOperation({
    description: 'Get email against facebook access token or login user if account already exists in the system'
  })
  @Post('user/facebook')
  @UseFilters(MysqlExceptionFilter)
  async facebook(@Body() facebookDto: FacebookDto, @Res() res: any) {
    const response = await this.authService.facebookRegister(facebookDto);
    if (response) {
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        response
      });
    }
  }

  @ApiTags('auth')
  @ApiOperation({
    description: 'Login as a user who have signed up via email.'
  })
  @Post('user/login')
  async loginUser(@Body() loginDto: LoginDto, @Res() res: any) {
    const response = await this.authService.loginUser(loginDto);
    if (response) {
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        response
      });
    }
  }

  @ApiTags('auth')
  @ApiOperation({
    description: 'Login as an administrator.'
  })
  @Post('admin/login')
  async loginAdmin(@Body() loginDto: LoginDto, @Res() res: any) {
    const response = await this.authService.loginAdmin(loginDto);
    if (response) {
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        response
      });
    }
  }

  @ApiTags('auth')
  @ApiOperation({
    description: 'Send an email to admin with a link to reset password.'
  })
  @Post('admin/forgotPassword')
  async adminForgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto, @Res() res: any) {
    const response = await this.authService.adminForgotPassword(forgotPasswordDto);
    if (response) {
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        response
      });
    }
  }

  @ApiTags('auth')
  @ApiOperation({
    description: 'Send an email to user with a link to reset password.'
  })
  @Post('user/forgotPassword')
  async userForgotPasssword(@Body() forgotPasswordDto: ForgotPasswordDto, @Res() res: any) {
    const response = await this.authService.userForgotPasssword(forgotPasswordDto);
    if (response) {
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        response
      });
    }
  }

}