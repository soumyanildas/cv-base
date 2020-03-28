import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Strength } from '../user/entities/strength.entity';
import { Skill } from '../user/entities/skill.entity';
import { JobType } from '../user/entities/jobType.entity';
import { Admin } from './entities/admin.entity';
import { CreateStrengthDto } from './dto/create-strength.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { CreateJobTypeDto } from './dto/create-jobType.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

import * as generator from 'generate-password';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(Strength) private readonly strengthsRepository: Repository<Strength>,
    @InjectRepository(Skill) private readonly skillsRepository: Repository<Skill>,
    @InjectRepository(JobType) private readonly jobTypesRepository: Repository<JobType>,
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
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
