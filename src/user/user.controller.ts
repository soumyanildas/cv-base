import { Controller, Get, Body, Res, HttpStatus, Post, Put, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUser } from '../common/decorator/user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateUserJobInterestDto } from './dto/create-userJobInterest.dto';
import { SearchJobDto } from './dto/search-job.dto';

@Controller()
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
    const userResponse = await this.userService.updateUser(updateUserDto, user.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      userResponse
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
    const userResponse = await this.userService.getUser(user.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      userResponse
    });
  }

  @ApiTags('user')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'View the basic info of user and also their skills, strengths, jobTypes and employment history'
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('user/jobInterest/:jobListingId')
  async createUserJobInterest(@Body() createUserJobInterestDto: CreateUserJobInterestDto, @Res() res: any, @AuthUser() user: any, @Param('jobListingId') jobListingId: string) {
    const userResponse = await this.userService.createUserJobInterest(createUserJobInterestDto, user.id, jobListingId);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      userResponse
    });
  }

  @ApiTags('user')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'View the basic info of user and also their skills, strengths, jobTypes and employment history'
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('user/followCompany/:companyId')
  async followCompany(@Res() res: any, @AuthUser() user: any, @Param('companyId') companyId: string) {
    const userResponse = await this.userService.followCompany(user.id, companyId);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      userResponse
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
    const userResponse = await this.userService.findEmployers(companyId);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      userResponse
    });
  }

  @ApiTags('user')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Ask for recommendation from an employer of a company'
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('user/askForRecommendation/:companyId/:employerId')
  async askForRecommendation(@Res() res: any, @AuthUser() user: any, @Param('companyId') companyId: string,  @Param('employerId') employerId: string) {
    const userResponse = await this.userService.askForRecommendation(user.id, employerId, companyId);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      userResponse
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
    const userResponse = await this.userService.recommendationsList(user.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      userResponse
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
    const userResponse = await this.userService.searchJob(searchJobDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      userResponse
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
