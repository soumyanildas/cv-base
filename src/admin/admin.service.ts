import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Strength } from '../user/entities/strength.entity';
import { Skill } from '../user/entities/skill.entity';
import { JobType } from '../user/entities/jobType.entity';
import { Admin } from './entities/admin.entity';
import { User } from '../user/entities/user.entity';
import { Company } from 'src/company/entities/company.entity';

import { CreateStrengthDto } from './dto/create-strength.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { CreateJobTypeDto } from './dto/create-jobType.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

import * as generator from 'generate-password';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { UpdateCompanyAdminDto } from './dto/update-company-admin.dto';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(Strength) private readonly strengthsRepository: Repository<Strength>,
    @InjectRepository(Skill) private readonly skillsRepository: Repository<Skill>,
    @InjectRepository(JobType) private readonly jobTypesRepository: Repository<JobType>,
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
  ) { }

  async createStrength(createStrengthDto: CreateStrengthDto) {
    return await this.strengthsRepository.save(createStrengthDto);
  }

  async createSkill(createSkillDto: CreateSkillDto) {
    return await this.skillsRepository.save(createSkillDto);
  }

  async createJobType(createJobTypeDto: CreateJobTypeDto) {
    return await this.jobTypesRepository.save(createJobTypeDto);
  }

  async createAdmin(createAdminDto: CreateAdminDto) {
    const randomPassword = this.generateRandomPassword();
    createAdminDto.password = randomPassword;
    const entity = Object.assign(new Admin(), createAdminDto);
    const adminResponse = await this.adminRepository.save(entity);
    return {
      ...adminResponse,
      password: randomPassword
    };
  }

  async viewUsers() {
    return await this.userRepository.find();
  }

  async viewUser(id: string) {
    return await this.userRepository.findOne({ id })
  }

  async viewCompanies() {
    return await this.companyRepository.find();
  }

  async viewCompany(id: string) {
    return await this.companyRepository.findOne({ id })
  }

  async updateUser(updateUserAdminDto: UpdateUserAdminDto, id: string) {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new HttpException('User not found.', 404);
    }
    const entity = Object.assign(new User(), { ...user, ...updateUserAdminDto });
    return await this.userRepository.save(entity);
  }

  async updateCompany(updateCompanyAdminDto: UpdateCompanyAdminDto, id: string) {
    const company = await this.companyRepository.findOne({ id });
    if (!company) {
      throw new HttpException('Company not found.', 404);
    }
    const entity = Object.assign(new Company(), { ...company, ...updateCompanyAdminDto });
    return await this.companyRepository.save(entity);
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
