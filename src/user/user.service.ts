import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserStrength } from './entities/userStrength.entity';
import { UserSkill } from './entities/userSkill.entity';
import { UserJobType } from './entities/userJobType.entity';
import { Strength } from './entities/strength.entity';
import { Skill } from './entities/skill.entity';
import { JobType } from './entities/jobType.entity';
import { JobListing } from '../company/entities/jobListing.entity';
import { UserJobInterest } from './entities/userJobInterest.entity';
import { Company } from '../company/entities/company.entity';
import { UserCompanyFollow } from '../common/entities/userCompanyFollow.entity';

import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserJobInterestDto } from './dto/create-userJobInterest.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Strength) private readonly strengthsRepository: Repository<Strength>,
    @InjectRepository(Skill) private readonly skillsRepository: Repository<Skill>,
    @InjectRepository(JobType) private readonly jobTypesRepository: Repository<JobType>,
    @InjectRepository(JobListing) private readonly jobListingRepository: Repository<JobListing>,
    @InjectRepository(UserJobInterest) private readonly userJobInterestRepository: Repository<UserJobInterest>,
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
    @InjectRepository(UserCompanyFollow) private readonly userCompanyFollowRepository: Repository<UserCompanyFollow>,
  ) { }

  /**
   * 
   * @param updateUserDto DTO to encapsulate the update user data
   * @param id id of the currently logged in user
   * @description Update the basic info of the user and his/her strengths, skills, jobTypes and employmentHistories
   */
  async updateUser(updateUserDto: UpdateUserDto, id: string) {
    const user: any = await this.userRepository.findOne({ id });
    // delete from userStrength table before new insert
    await this.userRepository
      .createQueryBuilder()
      .delete()
      .from(UserStrength)
      .where('userId = :id', { id })
      .execute();
    // delete from userSkill table before new insert
    await this.userRepository
      .createQueryBuilder()
      .delete()
      .from(UserSkill)
      .where('userId = :id', { id })
      .execute();
    // delete from UserJobType table before new insert
    await this.userRepository
      .createQueryBuilder()
      .delete()
      .from(UserJobType)
      .where('userId = :id', { id })
      .execute()
    return await this.userRepository.save({ ...user, ...updateUserDto });
  }

  /**
   * 
   * @param id id of the currently logged in user
   * @description Get the basic info and strengths, skills, jobTypes and employmentHistories of the user
   */
  async getUser(id: string) {
    return await this.userRepository
      .findOne({
        where: { id },
        relations: ['strengths', 'skills', 'jobTypes', 'employmentHistories']
      });
  }

  /**
   * 
   * @param createUserJobInterestDto DTO to encapsulate createUserJobInterest data
   * @param userId id of the currently logged in user who wants to show interest in a job
   * @param jobListingId id of the interested job listing
   */
  async createUserJobInterest(createUserJobInterestDto: CreateUserJobInterestDto, userId: string, jobListingId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const jobListing = await this.jobListingRepository.findOne({ where: { id: jobListingId } });
    createUserJobInterestDto.user = user;
    createUserJobInterestDto.jobListing = jobListing;
    const entity = Object.assign(new UserJobInterest(), createUserJobInterestDto);
    return await this.userJobInterestRepository.save(entity);
  }

  /**
   * 
   * @param userId id of the currently logged in user who wants to follow a company
   * @param companyId id of the company who the user wants to follow
   * @description Follow a company by the currently logged in user
   */
  async followCompany(userId: string, companyId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    const entity = Object.assign(new UserCompanyFollow(), { user, company })
    return await this.userCompanyFollowRepository.save(entity);
  }


  /**
   * @description Basic config endpoint, for now it returns the list of strengths, 
   * skills and jobTypes present in the database
   */
  async getConfig() {
    const strengths = await this.strengthsRepository.find();
    const skills = await this.skillsRepository.find();
    const jobTypes = await this.jobTypesRepository.find();
    return {
      strengths,
      skills,
      jobTypes
    };
  }

}
