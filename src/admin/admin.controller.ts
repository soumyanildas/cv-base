import { Controller, Post, UseGuards, Body, Res, HttpStatus, Get, Param, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateStrengthDto } from './dto/create-strength.dto';
import { AuthUser } from 'src/common/decorator/user.decorator';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { CreateJobTypeDto } from './dto/create-jobType.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { UpdateCompanyAdminDto } from './dto/update-company-admin.dto';

@Controller('admin')
export class AdminController {

  constructor(
    private readonly adminService: AdminService
  ) { }

  @ApiTags('admin')
  @ApiOperation({
    description: 'Create a strength'
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
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

  @ApiTags('admin')
  @ApiOperation({
    description: 'Create a skill'
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
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

  @ApiTags('admin')
  @ApiOperation({
    description: 'Create a jobType'
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
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

  // @ApiTags('admin')
  // @Post('create')
  // async createAdmin(@Body() createAdminDto: CreateAdminDto, @Res() res: any) {
  //   const response = await this.adminService.createAdmin(createAdminDto);
  //   return res.status(HttpStatus.OK).json({
  //     statusCode: 200,
  //     response
  //   });
  // }

  @ApiTags('admin')
  @ApiOperation({
    description: 'View all users currently present in the system'
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('users')
  async viewUsers(@Res() res: any, @AuthUser() user: any) {
    if (user.userType === 'admin') {
      const response = await this.adminService.viewUsers();
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

  @ApiTags('admin')
  @ApiOperation({
    description: 'View a particular user with his/her userId'
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('user/:userId')
  async viewUser(@Res() res: any, @AuthUser() user: any, @Param('userId') userId: string) {
    if (user.userType === 'admin') {
      const response = await this.adminService.viewUser(userId);
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

  @ApiTags('admin')
  @ApiOperation({
    description: 'Update an user\'s basic info'
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put('user/:userId')
  async updateUser(@Body() updateUserAdminDto: UpdateUserAdminDto ,@Res() res: any, @AuthUser() user: any, @Param('userId') userId: string) {
    if (user.userType === 'admin') {
      const response = await this.adminService.updateUser(updateUserAdminDto, userId);
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

  @ApiTags('admin')
  @ApiOperation({
    description: 'View all companies currently present in the system'
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('companies')
  async viewCompanies(@Res() res: any, @AuthUser() user: any) {
    if (user.userType === 'admin') {
      const response = await this.adminService.viewCompanies();
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

  @ApiTags('admin')
  @ApiOperation({
    description: 'View a particular company with their companyId'
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('company/:companyId')
  async viewCompany(@Res() res: any, @AuthUser() user: any, @Param('companyId') companyId: string) {
    if (user.userType === 'admin') {
      const response = await this.adminService.viewCompany(companyId);
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

  @ApiTags('admin')
  @ApiOperation({
    description: 'Update an user\'s basic info'
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put('company/:companyId')
  async updateCompany(@Body() updateCompanyAdminDto: UpdateCompanyAdminDto ,@Res() res: any, @AuthUser() user: any, @Param('companyId') companyId: string) {
    if (user.userType === 'admin') {
      const response = await this.adminService.updateCompany(updateCompanyAdminDto, companyId);
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
}
