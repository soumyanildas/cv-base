import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinTable, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Company } from './company.entity';
import { UserJobInterest } from '../../user/entities/userJobInterest.entity';

@Entity('job_listings')
export class JobListing {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Company)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({
    type: 'text'
  })
  jobName: string;

  @Column({
    type: 'text'
  })
  jobCategory: string;

  @Column({
    type: 'text',
    nullable: true
  })
  city: string;

  @Column({
    type: 'text',
  })
  employmentForm: string;

  @Column({
    type: 'text',
    nullable: true
  })
  jobDescription: string;

  @Column({
    type: 'date',
    nullable: true
  })
  lastApplicationDate: string;

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

  @OneToMany(type => UserJobInterest, userJobInterest => userJobInterest.jobListing)
  jobInterests: UserJobInterest[];

}