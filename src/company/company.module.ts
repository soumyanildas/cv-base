import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { JobListing } from './entities/jobListing.entity';
import { UserRecommendation } from 'src/common/entities/userRecommendation.entity';
import { UserJobInterest } from 'src/user/entities/userJobInterest.entity';
import { UserCompany } from 'src/common/entities/userCompany.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, JobListing, UserRecommendation, UserJobInterest, UserCompany])
  ],
  providers: [CompanyService],
  controllers: [CompanyController]
})
export class CompanyModule { }
