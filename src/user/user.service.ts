import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStrength } from './entities/userStrength.entity';
import { UserSkill } from './entities/userSkill.entity';
import { UserJobType } from './entities/userJobType.entity';
import { Strength } from './entities/strength.entity';
import { Skill } from './entities/skill.entity';
import { JobType } from './entities/jobType.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Strength) private readonly strengthsRepository: Repository<Strength>,
    @InjectRepository(Skill) private readonly skillsRepository: Repository<Skill>,
    @InjectRepository(JobType) private readonly jobTypesRepository: Repository<JobType>,
  ) { }

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

  async getUser(id: string) {
    return await this.userRepository
      .findOne({
        where: { id },
        relations: ['strengths', 'skills', 'jobTypes', 'employmentHistories']
      });
  }

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
