import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, getRepository, Brackets } from 'typeorm';
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
import { UserCompany } from 'src/common/entities/userCompany.entity';
import { UserRecommendation } from 'src/common/entities/userRecommendation.entity';
import { SearchJobDto } from './dto/search-job.dto';
import { AddDeviceDto } from './dto/add-device.dto';

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
    @InjectRepository(UserCompany) private readonly userCompanyRepository: Repository<UserCompany>,
    @InjectRepository(UserRecommendation) private readonly userRecommendationRepository: Repository<UserRecommendation>,
  ) { }

  /**
   * 
   * @param updateUserDto DTO to encapsulate the update user data
   * @param id id of the currently logged in user
   * @description Update the basic info of the user and his/her strengths, skills, jobTypes and employmentHistories
   */
  async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<any> {
    const user = await this.userRepository.findOne({ id });
    // delete from userStrength table before new insert
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(UserStrength)
      .where('userId = :id', { id })
      .execute();
    // delete from userSkill table before new insert
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(UserSkill)
      .where('userId = :id', { id })
      .execute();
    // delete from UserJobType table before new insert
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(UserJobType)
      .where('userId = :id', { id })
      .execute()
    user.updatedAt = new Date().toISOString();
    user.updatedBy = user.id;
    const entity = Object.assign(new User(), { ...user, ...updateUserDto })
    return await this.userRepository.save(entity);
  }

  /**
   * 
   * @param id id of the currently logged in user
   * @description Get the basic info and strengths, skills, jobTypes and employmentHistories of the user
   */
  async getUser(id: string): Promise<any> {
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
  async createUserJobInterest(createUserJobInterestDto: CreateUserJobInterestDto, userId: string, jobListingId: string): Promise<any> {
    const isInterested = await this.userJobInterestRepository
      .findOne({
        where: { user: userId, jobListing: jobListingId }
      });
    if (isInterested) {
      throw new HttpException('User already showed interest in this job', HttpStatus.CONFLICT);
    }
    const user = await this.userRepository
      .findOne({
        where: { id: userId }
      });
    const jobListing = await this.jobListingRepository
      .findOne({
        where: { id: jobListingId }
      });
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
  async followCompany(userId: string, companyId: string): Promise<any> {
    const isUserFollowing = await this.userCompanyFollowRepository
      .findOne({
        where: { user: userId, company: companyId }
      });
    if (isUserFollowing) {
      throw new HttpException('User already follows this company', HttpStatus.CONFLICT)
    }
    const user = await this.userRepository
      .findOne({
        where: { id: userId }
      });
    const company = await this.companyRepository
      .findOne({
        where: { id: companyId }
      });
    const entity = Object.assign(new UserCompanyFollow(), { user, company })
    return await this.userCompanyFollowRepository.save(entity);
  }

  /**
   * 
   * @param id id of the company who's employers is to be found
   * @description Find a list of all the employers belonging to a particular
   * company
   */
  async findEmployers(id: string): Promise<any> {
    const userCompany = await this.userCompanyRepository
      .find({
        where: { company: id },
        relations: ['user']
      });
    const employers = userCompany.map((data) => data.user);
    return employers;
  }

  /**
   * 
   * @param id id of the employer from whom user wants
   * recommendation
   * @description Ask for recommendation from an employer of a company
   */
  async askForRecommendation(userId: string, employerId: string, companyId: string): Promise<any> {
    const isUserRecommended = await this.userRecommendationRepository
      .findOne({
        where: { user: userId, recommendedBy: employerId, company: companyId },
      });
    if (isUserRecommended) {
      throw new HttpException('User already asked for recommendation from this company and employer', HttpStatus.CONFLICT);
    }
    const userCompany = await this.userCompanyRepository
      .findOne({
        where: { user: employerId, company: companyId },
        relations: ['user']
      });
    if (!userCompany) {
      throw new HttpException('Employer doesn\'t belong to that company', HttpStatus.NOT_FOUND)
    }
    const employer = userCompany.user;
    const company = await this.companyRepository
      .findOne({ where: { id: companyId } })
    const user = await this.userRepository
      .findOne({ where: { id: userId } });
    const userRecommendation = {
      user,
      recommendedBy: employer,
      company,
      createdAt: new Date().toISOString(),
      createdBy: user.id,
      updatedAt: new Date().toISOString(),
      updatedBy: user.id
    };
    const entity = Object.assign(new UserRecommendation(), userRecommendation);
    return await this.userRecommendationRepository.save(entity);
  }

  /**
   * 
   * @param userId id of the user currently logged in
   * @description Get a list of all the recommendations received by the
   * currently logged in user
   */
  async recommendationsList(userId: string): Promise<any> {
    return await this.userRecommendationRepository
      .find({
        where: { user: userId, isRecommendationGiven: true },
        relations: ['recommendedBy', 'company']
      });
  }

  /**
   * 
   * @param searchJobDto DTO to encapsulate the searchJob data
   * @description Returns a list of all jobs fulfilling the criteria
   * of the search query
   */
  async searchJob(searchJobDto: SearchJobDto): Promise<any> {
    let queryBuilder = getRepository(JobListing)
      .createQueryBuilder('jobListing')
      .leftJoinAndSelect('jobListing.company', 'company')
      .where('jobListing.employmentForm = :employmentForm', { employmentForm: searchJobDto.employmentForm })
    if (searchJobDto.city) {
      queryBuilder = queryBuilder
        .andWhere('jobListing.city = :city', { city: searchJobDto.city });
    }
    if (searchJobDto.jobCategory) {
      queryBuilder = queryBuilder
        .andWhere('jobListing.jobCategory = :jobCategory', { jobCategory: searchJobDto.jobCategory });
    }
    if (searchJobDto.searchQuery) {
      queryBuilder = queryBuilder
        .andWhere(new Brackets(qb => {
          qb
            .orWhere(`company.companyName LIKE '%${searchJobDto.searchQuery}%'`)
            .orWhere(`jobListing.jobName LIKE '%${searchJobDto.searchQuery}%'`)
        }))
    }
    queryBuilder = queryBuilder
      .andWhere('jobListing.lastApplicationDate >= CURDATE()')
      .orderBy('jobListing.lastApplicationDate', 'ASC')
    return await queryBuilder.getMany();
  }

  /**
   * 
   * @param id id of the currently logged in user
   * @description Get the count of the company user is following, job user is interested
   * in and recommendations user received
   */
  async getStats(id: string): Promise<any> {
    const companiesFollowing = await this.userCompanyFollowRepository.count({ where: { user: id } });
    const jobsInterested = await this.userJobInterestRepository.count({ where: { user: id } });
    const recommendationsReceived = await this.userRecommendationRepository.count({ where: { user: id, isRecommendationGiven: true } });
    return {
      companiesFollowing,
      jobsInterested,
      recommendationsReceived
    };
  }

  /**
   * @description Basic config endpoint, for now it returns the list of strengths, 
   * skills and jobTypes present in the database
   */
  async getConfig(): Promise<any> {
    const strengths = await this.strengthsRepository.find();
    const skills = await this.skillsRepository.find();
    const jobTypes = await this.jobTypesRepository.find();
    return {
      strengths,
      skills,
      jobTypes
    };
  }

  /**
   * 
   * @param addDeviceDto DTO to encapsulate addDevice data
   * @param id id of the currently logged in user
   * @description Add deviceId for the user for push notification
   * future
   */
  async addDevice(addDeviceDto: AddDeviceDto, id: string): Promise<any> {
    const user = await this.userRepository.findOne({ id });
    const entity = Object.assign(new User(), { ...user, ...addDeviceDto });
    return await this.userRepository.save(entity);
  }

  /**
   * 
   * @param id id of the currently logged in user
   * @description Remove deviceId for the user when user logs out
   */
  async removeDevice(id: string): Promise<any> {
    const user = await this.userRepository.findOne({ id });
    user.deviceId = null;
    const entity = Object.assign(new User(), user);
    return await this.userRepository.save(entity);
  }

}
