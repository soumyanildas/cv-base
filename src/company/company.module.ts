import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { JobListing } from './entities/jobListing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, JobListing])
  ],
  providers: [CompanyService],
  controllers: [CompanyController]
})
export class CompanyModule { }
