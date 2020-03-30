import { Controller, UseGuards, Put, Body, Res, HttpStatus, Get, Post, Param } from '@nestjs/common';
import { CompanyService } from './company.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthUser } from 'src/common/decorator/user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateJobListingDto } from './dto/create-jobListing.dto';
import { UpdateJobListingDto } from './dto/update-jobListing.dto';

@Controller()
export class CompanyController {

  constructor(
    private readonly companyService: CompanyService
  ) { }

  @ApiTags('company')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Update the info of currently logged in user\'s company'
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('company')
  async updateCompany(@Body() updateCompanDto: UpdateCompanyDto, @Res() res: any, @AuthUser() user: any) {
    if (user.userType === 'employer') {
      const response = await this.companyService.updateCompany(updateCompanDto, user.id)
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        response
      });
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: 401,
      message: 'You need to be an employer to access this route.'
    });
  }

  @ApiTags('company')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'View the info of currenty logged in user\'s company'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('company')
  async getUser(@Res() res: any, @AuthUser() user: any) {
    if (user.userType === 'employer') {
      const response = await this.companyService.viewCompany(user.id)
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        response
      });
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: 401,
      message: 'You need to be an employer to access this route.'
    });
  }

  @ApiTags('company')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Create a job listing as the currently logged in company'
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('company/jobListing/create')
  async createJobListing(@Body() createJobListingDto: CreateJobListingDto, @Res() res: any, @AuthUser() user: any) {
    if (user.userType === 'employer') {
      const response = await this.companyService.createJobListing(createJobListingDto, user.id)
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        response
      });
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: 401,
      message: 'You need to be an employer to access this route.'
    });
  }

  @ApiTags('company')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Update a job listing as the currently logged in company'
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('company/jobListing/update/:jobListingId')
  async updateJobListing(@Body() updateJobListingDto: UpdateJobListingDto, @Res() res: any, @AuthUser() user: any, @Param('jobListingId') jobListingId: string) {
    if (user.userType === 'employer') {
      const response = await this.companyService.updateJobListing(updateJobListingDto, jobListingId)
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        response
      });
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: 401,
      message: 'You need to be an employer to access this route.'
    });
  }

}
