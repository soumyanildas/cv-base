import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinTable, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Company } from './company.entity';
import { UserJobInterest } from 'src/users/entities/userJobInterest.entity';

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
  employementForm: string;

  @Column({
    type: 'text',
    nullable: true
  })
  jobDescription: string;

  @Column({
    type: 'datetime'
  })
  createdAt: string;

  @Column({
    type: 'text'
  })
  createdBy: string;

  @Column({
    type: 'datetime'
  })
  updatedAt: string;

  @Column({
    type: 'text'
  })
  updatedBy: string;

  @OneToMany(type => UserJobInterest, userJobInterest => userJobInterest.jobListing)
  jobInterests: UserJobInterest[];

}