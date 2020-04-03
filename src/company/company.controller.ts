import { Controller, UseGuards, Put, Body, Res, HttpStatus, Get, Post, Param } from '@nestjs/common';
import { CompanyService } from './company.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthUser } from 'src/common/decorator/user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateJobListingDto } from './dto/create-jobListing.dto';
import { UpdateJobListingDto } from './dto/update-jobListing.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { SearchCandidateDto } from './dto/search-candidate.dto';

@Controller('api/v1')
export class CompanyController {

  constructor(
    private readonly companyService: CompanyService
  ) { }

  @ApiTags('company')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'View list of all companies for currently logged in employer'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('companies')
  async companyList(@Res() res: any, @AuthUser() user: any) {
    if (user.userType === 'employer') {
      const response = await this.companyService.companyList(user.id)
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
    description: 'Update the info of a company'
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('company/:companyId')
  async updateCompany(@Body() updateCompanDto: UpdateCompanyDto, @Res() res: any, @Param('companyId') companyId: string, @AuthUser() user: any) {
    if (user.userType === 'employer') {
      const response = await this.companyService.updateCompany(updateCompanDto, companyId, user.id)
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
    description: 'View the info of a company'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('company/:companyId')
  async getUser(@Res() res: any, @Param('companyId') companyId: string, @AuthUser() user: any) {
    if (user.userType === 'employer') {
      const response = await this.companyService.viewCompany(companyId, user.id)
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
    description: 'Create a job listing for a company'
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('company/:companyId/jobListing/create')
  async createJobListing(@Body() createJobListingDto: CreateJobListingDto, @Param('companyId') companyId: string, @Res() res: any, @AuthUser() user: any) {
    if (user.userType === 'employer') {
      const response = await this.companyService.createJobListing(createJobListingDto, companyId, user.id)
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
    description: 'Update a job listing of a company'
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('company/jobListing/:jobListingId/update')
  async updateJobListing(@Body() updateJobListingDto: UpdateJobListingDto, @Res() res: any, @AuthUser() user: any, @Param('jobListingId') jobListingId: string) {
    if (user.userType === 'employer') {
      const response = await this.companyService.updateJobListing(updateJobListingDto, jobListingId, user.id)
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
    description: 'View job listings of a company'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('company/:companyId/jobListings')
  async viewJobListings(@Res() res: any, @AuthUser() user: any, @Param('companyId') companyId: string) {
    if (user.userType === 'employer') {
      const response = await this.companyService.viewJobListings(companyId)
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
    description: 'View a single job listing'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('company/jobListing/:jobListingId')
  async viewJobListing(@Res() res: any, @AuthUser() user: any, @Param('jobListingId') jobListingId: string) {
    if (user.userType === 'employer') {
      const response = await this.companyService.viewJobListing(jobListingId)
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
    description: 'List of all recommendations asked by candidates for currently logged in employer'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('company/recommendationList')
  async recommendationList(@Res() res: any, @AuthUser() user: any) {
    if (user.userType === 'employer') {
      const response = await this.companyService.recommendationList(user.id)
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
    description: 'Give recommendation to the candidate who asked for by specific employer'
  })
  @UseGuards(AuthGuard('jwt'))
  @Put('company/giveRecommendation/:recommendationId')
  async giveRecommendation(@Body() updateRecommendationDto: UpdateRecommendationDto, @Res() res: any, @AuthUser() user: any, @Param('recommendationId') recommendationId: string) {
    if (user.userType === 'employer') {
      const response = await this.companyService.giveRecommendation(updateRecommendationDto, recommendationId, user.id)
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
    description: 'Search for candidates'
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('company/searchCandidate')
  async searchCandidate(@Body() searchCandidateDto: SearchCandidateDto, @Res() res: any, @AuthUser() user: any) {
    if (user.userType === 'employer') {
      const response = await this.companyService.searchCandidate(searchCandidateDto)
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
    description: 'Get a company\'s stats'
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('company/:companyId/stats')
  async getStats(@Res() res: any, @AuthUser() user: any, @Param('companyId') companyId: string) {
    if (user.userType === 'employer') {
      const userResponse = await this.companyService.getStats(companyId);
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        userResponse
      });
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: 401,
      message: 'You need to be an employer to access this route.'
    });
  }

}
