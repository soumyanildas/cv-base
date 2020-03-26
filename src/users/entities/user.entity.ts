import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, ManyToOne, BeforeInsert, AfterInsert } from 'typeorm';
import { UserSkill } from './userSkill.entity';
import { UserJobType } from './userJobType.entity';
import { UserStrength } from './userStrength.entity';
import { UserEmploymentHistory } from './userEmploymentHistory.entity';
import { Company } from '../../companies/entities/company.entity';
import { UserJobInterest } from './userJobInterest.entity';
import { UserCompany } from 'src/common/entities/userCompany.entity';
import { UserCompanyFollow } from 'src/common/entities/userCompanyFollow.entity';
import { UserRecommendation } from 'src/common/entities/userRecommendation.entity';

import * as bcrypt from 'bcrypt';

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

  @PrimaryGeneratedColumn('uuid')
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
    type: 'text'
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
    type: 'text',
    nullable: true
  })
  cv: string;

  @Column({
    type: 'enum',
    enum: LoginType,
    default: LoginType.email
  })
  loginType: string;

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

  @OneToMany(type => UserStrength, userStrength => userStrength.user, { cascade: true })
  strengths: UserStrength[];

  @OneToMany(type => UserSkill, userSkill => userSkill.user, { cascade: true })
  skills: UserSkill[];

  @OneToMany(type => UserJobType, userJobType => userJobType.user, { cascade: true })
  jobTypes: UserJobType[];

  @OneToMany(type => UserEmploymentHistory, userEmploymentHistory => userEmploymentHistory.user, { nullable: true })
  employmentHistories: UserEmploymentHistory[];

  @OneToOne(type => Company, company => company.user, { cascade: true, nullable: true })
  company: Company;

  @ManyToMany(type => UserJobInterest, userJobInterest => userJobInterest.users, { nullable: true })
  jobInterests: UserJobInterest[];

  @ManyToOne(type => UserCompany, userCompany => userCompany.users, { nullable: true })
  userCompany: UserCompany;

  @ManyToMany(type => UserCompanyFollow, userCompany => userCompany.users, { nullable: true })
  companiesFollowing: UserCompanyFollow[];

  @OneToMany(type => UserRecommendation, userRecommendation => userRecommendation.user, { nullable: true })
  recommendations: UserRecommendation[];

  @OneToMany(type => UserRecommendation, userRecommendation => userRecommendation.recommendedBy, { nullable: true })
  recommended: UserRecommendation[];

  /** Hashing password before inserting into table */
  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  @AfterInsert()
  async afterInsert() {
    const timestamp = new Date().toISOString();
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
    this.createdBy = this.id;
    this.updatedBy = this.id;

    /** Updating company details if user is of type employer */
    if (this.userType === 'employer') {
      this.company.email = this.email;
      this.company.createdAt = timestamp;
      this.company.updatedAt = timestamp;
      this.company.createdBy = this.id;
      this.company.updatedBy = this.id;
    }
  }

}