import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Skill } from './entities/skill.entity';
import { Strength } from './entities/strength.entity';
import { JobType } from './entities/jobType.entity';
import { JobListing } from 'src/company/entities/jobListing.entity';
import { UserJobInterest } from './entities/userJobInterest.entity';
import { Company } from 'src/company/entities/company.entity';
import { UserCompanyFollow } from 'src/common/entities/userCompanyFollow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Skill, Strength, JobType, JobListing, UserJobInterest, Company, UserCompanyFollow])
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule { }
