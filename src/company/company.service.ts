import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { JobListing } from './entities/jobListing.entity';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateJobListingDto } from './dto/create-jobListing.dto';
import { UpdateJobListingDto } from './dto/update-jobListing.dto';

@Injectable()
export class CompanyService {

  constructor(
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
    @InjectRepository(JobListing) private readonly jobListingRepository: Repository<JobListing>,
  ) { }

  /**
   * 
   * @param updateCompanyDto DTO to encapuslate the update company data
   * @param id id of the user to find his/her company
   * @description Updates the currently logged in user's company details
   */
  async updateCompany(updateCompanyDto: UpdateCompanyDto, id: string): Promise<any> {
    const company = await this.companyRepository.findOne({ where: { user: id } });
    const entity = Object.assign(new Company(), { ...company, ...updateCompanyDto });
    return await this.companyRepository.save(entity);
  }

  /**
   * 
   * @param id id of the user to find his/her company
   * @description View the currently logged in user's company details
   */
  async viewCompany(id: string): Promise<any> {
    return await this.companyRepository.findOne({ where: { user: id } });
  }

  /**
   * 
   * @param createJobListingDto DTO to encapsulate the create job listing data
   * @param id id of the user to find his/her company
   * @description Create a job listing as the currently logged in user's company
   */
  async createJobListing(createJobListingDto: CreateJobListingDto, id: string): Promise<any> {
    const company = await this.companyRepository.findOne({ where: { user: id } });
    createJobListingDto.company = company;
    const entity = Object.assign(new JobListing(), createJobListingDto);
    return await this.jobListingRepository.save(entity);
  }

  /**
   * 
   * @param updateJobListingDto DTO to encapsulate te update job listing data
   * @param id id of the job listing to be updated
   * @description Update the details of the job listing via the id provided
   */
  async updateJobListing(updateJobListingDto: UpdateJobListingDto, id: string): Promise<any> {
    const jobListing = await this.jobListingRepository.findOne({ id });
    const entity = Object.assign(new JobListing(), {...jobListing, ...updateJobListingDto});
    return await this.jobListingRepository.save(entity);
  }

}
