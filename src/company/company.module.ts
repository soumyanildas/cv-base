import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { JobListing } from './entities/jobListing.entity';
import { UserRecommendation } from '../common/entities/userRecommendation.entity';
import { UserJobInterest } from '../user/entities/userJobInterest.entity';
import { UserCompany } from '../common/entities/userCompany.entity';
import { UserJobType } from '../user/entities/userJobType.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, JobListing, UserRecommendation, UserJobInterest, UserCompany, UserJobType])
  ],
  providers: [CompanyService],
  controllers: [CompanyController]
})
export class CompanyModule { }
