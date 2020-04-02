import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Company } from '../company/entities/company.entity';
import { Skill } from '../user/entities/skill.entity';
import { Strength } from '../user/entities/strength.entity';
import { JobType } from '../user/entities/jobType.entity';
import { Admin } from './entities/admin.entity';
import { UserCompany } from 'src/common/entities/userCompany.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Company, Skill, Strength, JobType, Admin, UserCompany])
  ],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
