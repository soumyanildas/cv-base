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
import { UserCompany } from '../common/entities/userCompany.entity';
import { MailService } from '../services/mail/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Company, Skill, Strength, JobType, Admin, UserCompany]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    })
  ],
  providers: [AdminService, MailService],
  controllers: [AdminController],
  exports: [AdminService]
})
export class AdminModule { }
