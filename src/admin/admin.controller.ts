import { Controller, Post, UseGuards, Body, Res, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateStrengthDto } from './dto/create-strength.dto';
import { AuthUser } from 'src/common/decorator/user.decorator';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { CreateJobTypeDto } from './dto/create-jobType.dto';

@Controller('admin')
export class AdminController {

  constructor(
    private readonly adminService: AdminService
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('create/strength')
  async createStrength(@Body() createStrengthDto: CreateStrengthDto, @Res() res: any, @AuthUser() user: any) {
    if (user.userType === 'admin') {
      const response = await this.adminService.createStrength(createStrengthDto);
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        response
      });
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: 401,
      message: 'You need to be an admin to access this route.'
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create/skill')
  async createSkill(@Body() createSkillDto: CreateSkillDto, @Res() res: any, @AuthUser() user: any) {
    if (user.userType === 'admin') {
      const response = await this.adminService.createSkill(createSkillDto);
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        response
      });
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: 401,
      message: 'You need to be an admin to access this route.'
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create/jobType')
  async createJobType(@Body() createJobType: CreateJobTypeDto, @Res() res: any, @AuthUser() user: any) {
    if (user.userType === 'admin') {
      const response = await this.adminService.createJobType(createJobType);
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        response
      });
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: 401,
      message: 'You need to be an admin to access this route.'
    });
  }

  @Post('create')
  async createAdmin(@Body() createAdminDto: CreateAdminDto, @Res() res: any) {
    const response = await this.adminService.createAdmin(createAdminDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response
    });
  }


}
