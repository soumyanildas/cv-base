import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Company } from './entities/company.entity';
import { JobListing } from './entities/jobListing.entity';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateJobListingDto } from './dto/create-jobListing.dto';
import { UpdateJobListingDto } from './dto/update-jobListing.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { UserRecommendation } from '../common/entities/userRecommendation.entity';
import { UserJobInterest } from '../user/entities/userJobInterest.entity';
import { UserCompany } from '../common/entities/userCompany.entity';
import { SearchCandidateDto } from './dto/search-candidate.dto';
import { User } from '../user/entities/user.entity';
import { UserJobType } from '../user/entities/userJobType.entity';
import { UserCompanyFollow } from '../common/entities/userCompanyFollow.entity';

import * as OneSignal from 'onesignal-node'

@Injectable()
export class CompanyService {

  onesignalClient: any;

  constructor(
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
    @InjectRepository(JobListing) private readonly jobListingRepository: Repository<JobListing>,
    @InjectRepository(UserRecommendation) private readonly userRecommendationRepository: Repository<UserRecommendation>,
    @InjectRepository(UserJobInterest) private readonly userJobInterestRepository: Repository<UserJobInterest>,
    @InjectRepository(UserCompany) private readonly userCompanyRepository: Repository<UserCompany>,
    @InjectRepository(UserCompanyFollow) private readonly userCompanyFollowRepository: Repository<UserCompanyFollow>,
  ) {
    this.onesignalClient = new OneSignal.Client('1597a7f2-13fb-4275-a459-ce25d01cd8f0', 'YzVjMGQ1NmMtYTFjNC00ZDQxLWE0N2YtM2Q1ZTU2MjFjMzQ5');
  }

  /**
   * 
   * @param userId id of the currently logged in employer
   * @description Get a list of all the companies that the
   * employer belongs to
   */
  async companyList(userId: string): Promise<any> {
    const userCompany = await this.userCompanyRepository
      .find({
        where: { user: userId },
        relations: ['company']
      });
    const companies = userCompany.map((data) => data.company);
    return {
      companies
    };
  }

  /**
   * 
   * @param updateCompanyDto DTO to encapuslate the update company data
   * @param companyId id of the company to be updated
   * @param userId id of te employer who's currently logged in
   * @description Updates the currently logged in user's company details
   */
  async updateCompany(updateCompanyDto: UpdateCompanyDto, companyId: string, userId: string): Promise<any> {
    const userCompany = await this.userCompanyRepository
      .findOne({
        where: { company: companyId, user: userId },
        relations: ['company']
      });
    if (!userCompany) {
      throw new HttpException('Company not found or user is not part of the company.', HttpStatus.NOT_FOUND);
    }
    const company = userCompany.company;
    company.updatedAt = new Date().toISOString();
    company.updatedBy = userId;
    const entity = Object.assign(new Company(), { ...company, ...updateCompanyDto });
    return await this.companyRepository.save(entity);
  }

  /**
   * 
   * @param companyId id of the company to which employer belongs to
   * @param userId id of the currently logged in employer
   * @description View the currently logged in user's company details
   */
  async viewCompany(companyId: string, userId: string): Promise<any> {
    const userCompany = await getRepository(UserCompany)
      .createQueryBuilder('userCompany')
      .leftJoinAndSelect('userCompany.company', 'company')
      .leftJoinAndSelect('company.jobListings', 'jobListings')
      .where('userCompany.company = :companyId', { companyId })
      .andWhere('userCompany.user = :userId', { userId })
      .getOne();
    if (!userCompany) {
      throw new HttpException('Company not found or user is not part of the company.', HttpStatus.NOT_FOUND);
    }
    return userCompany.company;
  }

  /**
   * 
   * @param createJobListingDto DTO to encapsulate the create job listing data
   * @param companyId id of the company to which employer belongs to
   * @param userId id of the currently logged in employer
   * @description Create a job listing as the currently logged in user's company
   */
  async createJobListing(createJobListingDto: CreateJobListingDto, companyId: string, userId: string): Promise<any> {
    const userCompany = await this.userCompanyRepository
      .findOne({
        where: { company: companyId, user: userId },
        relations: ['company']
      });
    if (!userCompany) {
      throw new HttpException('Company not found or user is not part of the company.', HttpStatus.NOT_FOUND);
    }
    createJobListingDto.company = userCompany.company;
    const jobListing: any = createJobListingDto;
    jobListing.createdAt = new Date().toISOString();
    jobListing.createdBy = userId;
    jobListing.updatedAt = new Date().toISOString();
    jobListing.updatedBy = userId;
    const entity = Object.assign(new JobListing(), createJobListingDto);
    const jobListingResponse = await this.jobListingRepository.save(entity);
    // Sending push notification when a new job listing is posted to the candidats following the company
    const userFollowing = await this.userCompanyFollowRepository
      .find({
        where: { company: companyId },
        relations: ['user']
      });
    const userDevicesId = [];
    userFollowing.forEach((data) => {
      if (data.user.deviceId) {
        userDevicesId.push(data.user.deviceId);
      }
    });
    if (userDevicesId.length) {
      const notification = {
        'headings': { en: 'New Job Listing' },
        'contents': { en: `${userCompany.company.companyName} posted a new job listing` },
        'include_player_ids': userDevicesId,
        'data': { jobListingId: jobListingResponse.id }
      };
      this.onesignalClient.createNotification(notification);
    }
    return jobListingResponse;
  }

  /**
   * 
   * @param updateJobListingDto DTO to encapsulate te update job listing data
   * @param id id of the job listing to be updated
   * @description Update the details of the job listing via the id provided
   */
  async updateJobListing(updateJobListingDto: UpdateJobListingDto, id: string, userId: string): Promise<any> {
    const jobListing = await this.jobListingRepository.findOne({ id });
    jobListing.updatedAt = new Date().toISOString();
    jobListing.updatedBy = userId;
    const entity = Object.assign(new JobListing(), { ...jobListing, ...updateJobListingDto });
    return await this.jobListingRepository.save(entity);
  }

  /**
   * 
   * @param companyId id of the company to which employer belongs to
   * @description List of job listings of the company who's id is
   * provided
   */
  async viewJobListings(companyId: string): Promise<any> {
    return await this.jobListingRepository.find({ where: { company: companyId } });
  }

  /**
   * 
   * @param jobListingId id of the job listing
   * @description Give detail of the job listing along with the candidates
   * who showed interest in the job listing
   */
  async viewJobListing(jobListingId: string): Promise<any> {
    const userJobInterest = await this.userJobInterestRepository
      .find({
        where: { jobListing: jobListingId },
        relations: ['user', 'jobListing']
      });
    const job = userJobInterest[0].jobListing;
    const users = userJobInterest.map((data) => data.user);
    return {
      job,
      users
    };
  }

  /**
   * 
   * @param companyId id of the company
   * @description Get a list of all the candidates interested/following the company
   */
  async interestedCandidates(companyId: string): Promise<any> {
    return await getRepository(UserCompanyFollow)
      .createQueryBuilder('userCompanyFollow')
      .leftJoinAndSelect('userCompanyFollow.user', 'user')
      .leftJoinAndSelect('userCompanyFollow.company', 'company')
      .where('userCompanyFollow.company = :companyId', { companyId })
      .getMany();
  }

  /**
   * 
   * @param candidateId id of the candidate
   * @description Get details of a candidate
   */
  async getCandidate(candidateId: string): Promise<any> {
    return await getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.strengths', 'strengths')
      .leftJoinAndSelect('strengths.strength', 'strength')
      .leftJoinAndSelect('user.skills', 'skills')
      .leftJoinAndSelect('skills.skill', 'skill')
      .leftJoinAndSelect('user.jobTypes', 'jobTypes')
      .leftJoinAndSelect('jobTypes.jobType', 'jobType')
      .leftJoinAndSelect('user.employmentHistories', 'employmentHistories')
      .leftJoinAndSelect('user.recommendations', 'recommendations')
      .leftJoinAndSelect('recommendations.recommendedBy', 'recommendedBy')
      .leftJoinAndSelect('recommendations.company', 'company')
      .where('user.id = :candidateId', { candidateId })
      .andWhere('user.userType = :userType', { userType: 'candidate' })
      .andWhere('recommendations.isRecommendationGiven = 1')
      .getOne();
  }

  /**
   * @param companyId id of the company
   * @param userId id of the currently logged in employer
   * @description Get a list of all the pending recommendation and
   * the given recommendation by the currently logged in employer 
   */
  async recommendationList(companyId: string, userId: string): Promise<any> {
    const recommendations = await this.userRecommendationRepository
      .find({
        where: { company: companyId, recommendedBy: userId },
        relations: ['recommendedBy', 'user']
      });
    const recommendationGiven = recommendations.filter((data) => data.isRecommendationGiven);
    const recommendationPending = recommendations.filter((data) => !data.isRecommendationGiven);
    return {
      recommendationPending,
      recommendationGiven
    };
  }

  /**
   * 
   * @param updateRecommendationDto DTO to encapsulate the updateRecommendation data
   * @param id id of the recommendation to be updated
   * @description Currently logged in employer gives recommendation to a candidate
   * if isRecommendationGiven is `false`
   */
  async giveRecommendation(updateRecommendationDto: UpdateRecommendationDto, id: string, userId: string): Promise<any> {
    const userRecommendation = await this.userRecommendationRepository.findOne({ id });
    if (userRecommendation.isRecommendationGiven) {
      throw new HttpException('Recommendation already given for this user', HttpStatus.CONFLICT);
    }
    const recommendation: any = updateRecommendationDto;
    recommendation.isRecommendationGiven = true;
    recommendation.updatedAt = new Date().toISOString();
    recommendation.updatedBy = userId;
    const entity = Object.assign(new UserRecommendation(), { ...userRecommendation, ...recommendation });
    return await this.userRecommendationRepository.save(entity);
  }

  /**
   * 
   * @param searchCandidateDto DTO to encapsulate the searchCandidate data
   * @description Returns a list of all candidates fulfilling the criteria
   * of the search query
   */
  async searchCandidate(searchCandidateDto: SearchCandidateDto): Promise<any> {
    const userJobType = getRepository(UserJobType)
      .createQueryBuilder('userJobType')
      .leftJoinAndSelect('userJobType.user', 'user')
      .select('user.id', 'id')
      .where('userJobType.jobTypeId = :jobTypes', { jobTypes: searchCandidateDto.jobTypes })
      .andWhere('userJobType.experience >= :experience', { experience: searchCandidateDto.experience });

    let queryBuilder = getRepository(User)
      .createQueryBuilder('user')
      .where('user.userType = :userType', { userType: 'candidate' })
      .andWhere('user.id IN (' + userJobType.getQuery() + ')')
      .andWhere('user.jobStatus = :jobStatus', { jobStatus: searchCandidateDto.jobStatus });
    if (searchCandidateDto.city) {
      queryBuilder = queryBuilder
        .andWhere('user.city = :city', { city: searchCandidateDto.city });
    }
    if (searchCandidateDto.candidateName) {
      queryBuilder = queryBuilder
        .andWhere(`CONCAT(user.firstName, ' ', user.lastName) LIKE '%${searchCandidateDto.candidateName}%'`)
    }
    queryBuilder = queryBuilder
      .setParameters(userJobType.getParameters());
    return await queryBuilder.getMany();
  }

  /**
   * 
   * @param companyId id of a company
   * @description Get the count of the current active jobs, candidates interested
   * and recommendation given by a company
   */
  async getStats(companyId: string): Promise<any> {
    const activeJobs = await getRepository(JobListing)
      .createQueryBuilder('jobListing')
      .where('jobListing.companyId = :companyId', { companyId })
      .andWhere('jobListing.lastApplicationDate >= CURDATE()')
      .getCount();
    const candidatesInterested = await getRepository(UserJobInterest)
      .createQueryBuilder('userJobInterest')
      .leftJoinAndSelect('userJobInterest.jobListing', 'jobListing')
      .where('jobListing.companyId = :companyId', { companyId })
      // .andWhere('jobListing.lastApplicationDate >= CURDATE()')
      .getCount();
    const recommendationsGiven = await getRepository(UserRecommendation)
      .createQueryBuilder('userRecommendation')
      .where('userRecommendation.companyId = :companyId', { companyId })
      .andWhere('userRecommendation.isRecommendationGiven = 1')
      .getCount();
    return {
      activeJobs,
      candidatesInterested,
      recommendationsGiven
    };
  }

}
