import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { JobListing } from './jobListing.entity';
import { UserCompany } from 'src/common/entities/userCompany.entity';
import { UserCompanyFollow } from 'src/common/entities/userCompanyFollow.entity';
import { UserRecommendation } from 'src/common/entities/userRecommendation.entity';

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

  @ManyToMany(type => UserCompany, userCompany => userCompany.companies, { nullable: true })
  userCompany: UserCompany[];

  @ManyToMany(type => UserCompanyFollow, userCompany => userCompany.companies, { nullable: true })
  usersFollowing: UserCompanyFollow[];

  @OneToMany(type => UserRecommendation, userRecommendation => userRecommendation.company, { nullable: true })
  recommendations: UserRecommendation[];

}