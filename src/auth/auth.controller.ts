import { Controller, Post, Res, HttpStatus, Body, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from '../user/dto/login.dto';
import { MysqlExceptionFilter } from '../filters/mysql-exception.filter';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FacebookDto } from 'src/user/dto/facebook.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiTags('user')
  @ApiOperation({
    description: 'Register a user. User can have userType as "candidate" or "employer". If "employer" then company details is required. User signed up with facebook already are logged in the next time.'
  })
  @Post('user/register')
  @UseFilters(MysqlExceptionFilter)
  async register(@Body() createUserDto: CreateUserDto, @Res() res: any) {
    const response = await this.authService.register(createUserDto);
    if (response) {
      // delete response.password;
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        response
      });
    }
  }

  @ApiTags('user')
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

  @ApiTags('user')
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

  @ApiTags('admin')
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

}