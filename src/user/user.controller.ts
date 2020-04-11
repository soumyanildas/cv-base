import { Controller, Get, Body, Res, HttpStatus, Post, Put, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUser } from '../common/decorator/user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserJobInterestDto } from './dto/create-userJobInterest.dto';
import { SearchJobDto } from './dto/search-job.dto';
import { AddDeviceDto } from './dto/add-device.dto';

@Controller('api/v1')
export class UserController {

  constructor(
    private readonly userService: UserService
  ) { }

  @ApiTags('user')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Update the basic info of user and also their skills, strengths, jobTypes and employment history'
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('user')
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Res() res: any, @AuthUser() user: any) {
    const response = await this.userService.updateUser(updateUserDto, user.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response
    });
  }

  @ApiTags('user')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'View the basic info of user and also their skills, strengths, jobTypes and employment history'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async getUser(@Res() res: any, @AuthUser() user: any) {
    const response = await this.userService.getUser(user.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response
    });
  }

  @ApiTags('user')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'View the details of a particular jobListing'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('user/jobListing/:jobListingId')
  async getJob(@Res() res: any, @Param('jobListingId') jobListingId: string, @AuthUser() user: any) {
    const response = await this.userService.getJob(jobListingId, user.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response
    });
  }

  @ApiTags('user')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Show interest in an open job as a candidate'
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('user/jobInterest/:jobListingId')
  async createUserJobInterest(@Body() createUserJobInterestDto: CreateUserJobInterestDto, @Res() res: any, @AuthUser() user: any, @Param('jobListingId') jobListingId: string) {
    const response = await this.userService.createUserJobInterest(createUserJobInterestDto, user.id, jobListingId);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response
    });
  }

  @ApiTags('user')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'View all the active companies'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('user/companies')
  async getCompanies(@Res() res: any) {
    const response = await this.userService.getCompanies();
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response
    });
  }

  @ApiTags('user')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get detail of a particular company along with it\'s employer and current active job listings'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('user/company/:companyId')
  async getCompany(@Res() res: any, @Param('companyId') companyId: string, @AuthUser() user: any) {
    const response = await this.userService.getCompany(companyId, user.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response
    });
  }

  @ApiTags('user')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Follow a company as a candidate'
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('user/followCompany/:companyId')
  async followCompany(@Res() res: any, @AuthUser() user: any, @Param('companyId') companyId: string) {
    const response = await this.userService.followCompany(user.id, companyId);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response
    });
  }

  @ApiTags('user')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'View a list of all the employers belonging to a particular company'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('user/findEmployers/:companyId')
  async findEmployers(@Res() res: any, @AuthUser() user: any, @Param('companyId') companyId: string) {
    const response = await this.userService.findEmployers(companyId);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response
    });
  }

  @ApiTags('user')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Ask for recommendation from an employer of a company'
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('user/askForRecommendation/:companyId/:employerId')
  async askForRecommendation(@Res() res: any, @AuthUser() user: any, @Param('companyId') companyId: string, @Param('employerId') employerId: string) {
    const response = await this.userService.askForRecommendation(user.id, employerId, companyId);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response
    });
  }

  @ApiTags('user')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get all recommendations received by user'
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('user/recommendationsList')
  async recommendationsList(@Res() res: any, @AuthUser() user: any) {
    const response = await this.userService.recommendationsList(user.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response
    });
  }

  @ApiTags('user')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Search for job listings'
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('user/searchJob')
  async searchJob(@Body() searchJobDto: SearchJobDto, @Res() res: any) {
    const response = await this.userService.searchJob(searchJobDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response
    });
  }

  @ApiTags('user')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Currently logged in user\'s stats'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('user/stats')
  async getStats(@Res() res: any, @AuthUser() user: any) {
    const response = await this.userService.getStats(user.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response
    });
  }

  @ApiTags('user')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Add deviceId to a user'
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('user/addDevice')
  async addDevice(@Body() addDeviceDto: AddDeviceDto, @Res() res: any, @AuthUser() user: any) {
    const response = await this.userService.addDevice(addDeviceDto, user.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response
    });
  }

  @ApiTags('user')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Remove deviceId from a user'
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('user/removeDevice')
  async removeDevice(@Res() res: any, @AuthUser() user: any) {
    const response = await this.userService.removeDevice(user.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response
    });
  }


  @ApiTags('config')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('config')
  async getConfig(@Res() res: any) {
    const config = await this.userService.getConfig();
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      config
    });
  }
}
