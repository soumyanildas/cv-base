import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, getConnection } from 'typeorm';
import { Strength } from '../user/entities/strength.entity';
import { Skill } from '../user/entities/skill.entity';
import { JobType } from '../user/entities/jobType.entity';
import { Admin } from './entities/admin.entity';
import { User } from '../user/entities/user.entity';
import { Company } from '../company/entities/company.entity';

import { CreateStrengthDto } from './dto/create-strength.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { CreateJobTypeDto } from './dto/create-jobType.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

import * as generator from 'generate-password';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { UpdateCompanyAdminDto } from './dto/update-company-admin.dto';
import { UserCompany } from '../common/entities/userCompany.entity';

import * as bcrypt from 'bcrypt';
import { MailService } from '../services/mail/mail.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(Strength) private readonly strengthsRepository: Repository<Strength>,
    @InjectRepository(Skill) private readonly skillsRepository: Repository<Skill>,
    @InjectRepository(JobType) private readonly jobTypesRepository: Repository<JobType>,
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
    @InjectRepository(UserCompany) private readonly userCompanyRepository: Repository<UserCompany>,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService
  ) { }

  /**
   * 
   * @param createStrengthDto DTO to encapsulate the createStrength data
   * @description Create strength
   */
  async createStrength(createStrengthDto: CreateStrengthDto): Promise<any> {
    return await this.strengthsRepository.save(createStrengthDto);
  }

  /**
   * 
   * @param createSkillDto DTO to encapsulate the createSkill data
   * @description Create skill
   */
  async createSkill(createSkillDto: CreateSkillDto): Promise<any> {
    return await this.skillsRepository.save(createSkillDto);
  }

  /**
   * 
   * @param createJobTypeDto DTO to encapsulate the createJobType data
   * @description Create a job type
   */
  async createJobType(createJobTypeDto: CreateJobTypeDto): Promise<any> {
    return await this.jobTypesRepository.save(createJobTypeDto);
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<any> {
    const randomPassword = this.generateRandomPassword();
    createAdminDto.password = randomPassword;
    const entity = Object.assign(new Admin(), createAdminDto);
    const adminResponse = await this.adminRepository.save(entity);
    return {
      ...adminResponse,
      password: randomPassword
    };
  }

  /**
   * @description View all users in the database
   */
  async viewUsers(): Promise<any> {
    return await this.userRepository.find();
  }

  /**
   * 
   * @param id id of the user
   * @description View details of a particular user
   */
  async viewUser(id: string): Promise<any> {
    return await this.userRepository.findOne({ id })
  }

  /**
   * View all companies in the database
   */
  async viewCompanies(): Promise<any> {
    return await this.companyRepository.find();
  }

  /**
   * 
   * @param id id of the company
   * @description View details of a particular company
   */
  async viewCompany(id: string): Promise<any> {
    return await this.companyRepository.findOne({ id })
  }

  /**
   * 
   * @param updateUserAdminDto DTO to encapsulate the updateUserAdmin data
   * @param id id of the user to be updated
   * @description Update the data of the users
   */
  async updateUser(updateUserAdminDto: UpdateUserAdminDto, id: string, adminId: string): Promise<any> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    user.updatedAt = new Date().toISOString();
    user.updatedBy = adminId;
    const entity = Object.assign(new User(), { ...user, ...updateUserAdminDto });
    return await this.userRepository.save(entity);
  }

  /**
   * 
   * @param updateCompanyAdminDto DTO to encapsulate the updateCompanyAdmin data
   * @param id id of the company to be updated
   * @description Update te data of the company
   */
  async updateCompany(updateCompanyAdminDto: UpdateCompanyAdminDto, id: string, adminId: string): Promise<any> {
    const company = await this.companyRepository.findOne({ id });
    if (!company) {
      throw new HttpException('Company not found.', HttpStatus.NOT_FOUND);
    }
    company.updatedAt = new Date().toISOString();
    company.updatedBy = adminId;
    const entity = Object.assign(new Company(), { ...company, ...updateCompanyAdminDto });
    return await this.companyRepository.save(entity);
  }

  /**
   * 
   * @param companyId id of the company
   * @description Finding employers who are not part of the company who's
   * id has been sent
   */
  async findOutsideEmployers(companyId: string): Promise<any> {
    const userCompany = await getRepository(UserCompany)
      .createQueryBuilder('userCompany')
      .select('userCompany.user', 'id')
      .where('userCompany.company = :companyId', { companyId });
    const users = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.id NOT IN (' + userCompany.getQuery() + ')')
      .andWhere('user.userType = :userType', { userType: 'employer' })
      .setParameters(userCompany.getParameters())
      .getMany();
    return users;
  }

  /**
   * 
   * @param employerId id of the employer who is to be assigned to a company
   * @param companyId id of the company to which the employer is to be assigned
   * @description Assign an employer to the company
   */
  async assignEmployerCompany(employerId: string, companyId: string): Promise<any> {
    const employer = await this.userRepository.findOne({ where: { id: employerId } });
    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    const userCompany = {
      user: employer,
      company
    };
    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(UserCompany)
    .where('user = :employerId', { employerId })
    .execute()
    const entity = Object.assign(new UserCompany(), userCompany);
    await this.userCompanyRepository.save(entity)
  }

  async resetPassword(password: string, id: string): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await this.adminRepository.findOne({ id });
    user.password = hashPassword;
    return await this.adminRepository.save(user);
  }

  /**
   * @description Generate a 10 character alphanumeric passwrod
   */
  private generateRandomPassword(): string {
    return generator.generate({
      length: 10,
      numbers: true
    });
  }

}
