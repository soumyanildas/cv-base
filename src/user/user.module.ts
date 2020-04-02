import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Skill } from './entities/skill.entity';
import { Strength } from './entities/strength.entity';
import { JobType } from './entities/jobType.entity';
import { JobListing } from '../company/entities/jobListing.entity';
import { UserJobInterest } from './entities/userJobInterest.entity';
import { Company } from '../company/entities/company.entity';
import { UserCompanyFollow } from '../common/entities/userCompanyFollow.entity';
import { UserCompany } from '../common/entities/userCompany.entity';
import { UserRecommendation } from 'src/common/entities/userRecommendation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Skill, Strength, JobType, JobListing, UserJobInterest, Company, UserCompanyFollow, UserCompany, UserRecommendation])
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule { }
