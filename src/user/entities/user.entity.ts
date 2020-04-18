import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, BeforeInsert, PrimaryColumn } from 'typeorm';
import { UserSkill } from './userSkill.entity';
import { UserJobType } from './userJobType.entity';
import { UserStrength } from './userStrength.entity';
import { UserEmploymentHistory } from './userEmploymentHistory.entity';
import { Company } from '../../company/entities/company.entity';
import { UserJobInterest } from './userJobInterest.entity';
import { UserCompany } from '../../common/entities/userCompany.entity';
import { UserCompanyFollow } from '../../common/entities/userCompanyFollow.entity';
import { UserRecommendation } from '../../common/entities/userRecommendation.entity';

import * as bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';

export enum Gender {
  male = 'male',
  female = 'female'
}

export enum UserType {
  candidate = 'candidate',
  employer = 'employer',
}

export enum LoginType {
  email = 'email',
  facebook = 'facebook',
  instagram = 'instagram'
}

@Entity('users')
export class User {

  @PrimaryColumn()
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true
  })
  email: string;

  @Column({
    type: 'text',
    nullable: true
  })
  firstName: string;

  @Column({
    type: 'text',
    nullable: true
  })
  lastName: string;

  @Column({
    type: 'text',
    select: false,
    nullable: true
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.candidate
  })
  userType: string;

  @Column({
    type: 'numeric',
    nullable: true
  })
  mobile: number;

  @Column({
    type: 'year',
    nullable: true
  })
  birthYear: number;

  @Column({
    type: 'text',
    nullable: true
  })
  city: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.male
  })
  gender: string;

  @Column({
    type: 'text',
    nullable: true
  })
  jobStatus: string;

  @Column({
    type: 'text',
    nullable: true
  })
  about: string;

  @Column({
    type: 'text',
    nullable: true
  })
  profilePicture: string;

  @Column({
    type: 'text',
    nullable: true
  })
  cvLink: string;

  @Column({
    type: 'text',
    nullable: true
  })
  deviceId: string;

  @Column({
    type: 'enum',
    enum: LoginType,
    default: LoginType.email
  })
  loginType: string;

  @Column({
    type: 'boolean',
    nullable: true
  })
  isActive: boolean;

  @Column({
    type: 'text',
    nullable: true
  })
  createdAt: string;

  @Column({
    type: 'text',
    nullable: true
  })
  createdBy: string;

  @Column({
    type: 'text',
    nullable: true
  })
  updatedAt: string;

  @Column({
    type: 'text',
    nullable: true
  })
  updatedBy: string;

  @OneToMany(type => UserStrength, userStrength => userStrength.user, { cascade: true, nullable: true })
  strengths: UserStrength[];

  @OneToMany(type => UserSkill, userSkill => userSkill.user, { cascade: true, nullable: true })
  skills: UserSkill[];

  @OneToMany(type => UserJobType, userJobType => userJobType.user, { cascade: true, nullable: true })
  jobTypes: UserJobType[];

  @OneToMany(type => UserEmploymentHistory, userEmploymentHistory => userEmploymentHistory.user, { cascade: true, nullable: true })
  employmentHistories: UserEmploymentHistory[];

  @OneToOne(type => Company, company => company.user, { cascade: true, nullable: true })
  company: Company;

  @OneToMany(type => UserJobInterest, userJobInterest => userJobInterest.user, { nullable: true })
  jobInterests: UserJobInterest[];

  @OneToMany(type => UserCompany, userCompany => userCompany.user, { nullable: true })
  userCompanies: UserCompany[];

  @OneToMany(type => UserCompanyFollow, userCompany => userCompany.user, { nullable: true })
  companiesFollowing: UserCompanyFollow[];

  @OneToMany(type => UserRecommendation, userRecommendation => userRecommendation.user, { nullable: true })
  recommendations: UserRecommendation[];

  @OneToMany(type => UserRecommendation, userRecommendation => userRecommendation.recommendedBy, { nullable: true })
  recommended: UserRecommendation[];

  /** Hashing password before inserting into table */
  @BeforeInsert()
  async beforeInsert() {

    this.id = uuid4();
    const timestamp = new Date().toISOString();

    this.createdAt = timestamp;
    this.updatedAt = timestamp;
    this.createdBy = this.id;
    this.updatedBy = this.id;
    this.isActive = true;

    if (this.loginType !== 'facebook') {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }

    if (this.userType === 'employer') {
      this.isActive = false;
      if (this.company) {
        this.company.createdAt = timestamp;
        this.company.updatedAt = timestamp;
        this.company.createdBy = this.id;
        this.company.updatedBy = this.id;
      }
    }
  }

}