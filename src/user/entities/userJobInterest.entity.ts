import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { JobListing } from '../../company/entities/jobListing.entity';

@Entity()
export class UserJobInterest {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true
  })
  coverLetter: string;

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

  @ManyToOne(type => User, user => user.jobInterests)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(type => JobListing, jobListing => jobListing.jobInterests)
  jobListing: JobListing;

}