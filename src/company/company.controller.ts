import { Controller, UseGuards, Put, Body, Res, HttpStatus } from '@nestjs/common';
import { CompanyService } from './company.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthUser } from 'src/common/decorator/user.decorator';

@Controller()
export class CompanyController {

  constructor(
    private readonly companyService: CompanyService
  ) { }

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
      message: 'You need to be a employer to access this route.'
    });

  }

}
