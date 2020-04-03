import { Controller, Get, Render, Query, Post, Req } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AdminService } from './admin/admin.service';
@Controller()
export class AppController {

  id: string;
  userType: string;

  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) { }

  @ApiExcludeEndpoint()
  @Get('reset-password')
  @Render('reset-password')
  resetPassword(@Query('token') token: string) {
    try {
      const payload = this.jwtService.verify(token);
      this.id = payload.id;
      this.userType = payload.userType;
      return { email: payload.email };
    } catch (error) {
      console.log(error);
      return { error: true, message: 'Unauthorized access' };
    }
  }

  @ApiExcludeEndpoint()
  @Post('submit')
  @Render('successful')
  async changePassword(@Req() req: any) {
    if (this.userType === 'user') {
      await this.authService.resetPassword(req.body.newPassword, this.id);
    } else {
      await this.adminService.resetPassword(req.body.newPassword, this.id);
    }
    return { message: 'Successful' }
  }

}
