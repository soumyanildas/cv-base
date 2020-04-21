import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, BeforeUpdate } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { JobListing } from './jobListing.entity';
import { UserCompany } from '../../common/entities/userCompany.entity';
import { UserCompanyFollow } from '../../common/entities/userCompanyFollow.entity';
import { UserRecommendation } from '../../common/entities/userRecommendation.entity';

export enum LicenseType {
  standard = 'standard',
  premium = 'premium'
}

@Entity('companies')
export class Company {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(type => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true
  })
  companyName: string;

  @Column({
    type: 'numeric',
    nullable: true
  })
  mobile: number;

  @Column({
    type: 'text',
    nullable: true
  })
  city: string;

  @Column({
    type: 'text',
    nullable: true
  })
  profilePicture: string;

  @Column({
    type: 'text',
    nullable: true
  })
  homePage: string;

  @Column({
    type: 'text',
    nullable: true
  })
  facebook: string;

  @Column({
    type: 'text',
    nullable: true
  })
  instagram: string;

  @Column({
    type: 'text',
    nullable: true
  })
  about: string;

  @Column({
    type: 'enum',
    enum: LicenseType,
    default: LicenseType.standard
  })
  licenseType: string;

  @Column({
    type: 'boolean',
    default: false
  })
  isActive: boolean;

  @Column({
    type: 'datetime',
    nullable: true
  })
  createdAt: string;

  @Column({
    type: 'text',
    nullable: true
  })
  createdBy: string;

  @Column({
    type: 'datetime',
    nullable: true
  })
  updatedAt: string;

  @Column({
    type: 'text',
    nullable: true
  })
  updatedBy: string;

  @OneToMany(type => JobListing, jobListing => jobListing.company, { nullable: true })
  jobListings: JobListing[];

  @OneToMany(type => UserCompany, userCompany => userCompany.company, { nullable: true })
  userCompany: UserCompany[];

  @OneToMany(type => UserCompanyFollow, userCompany => userCompany.company, { nullable: true })
  usersFollowing: UserCompanyFollow[];

  @OneToMany(type => UserRecommendation, userRecommendation => userRecommendation.company, { nullable: true })
  recommendations: UserRecommendation[];

  @BeforeUpdate()
  beforeUpdate() {
    const timestamp = new Date().toISOString();
    this.updatedAt = timestamp;
    this.updatedBy = this.id;
  }

}