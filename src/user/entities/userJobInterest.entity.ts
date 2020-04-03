import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
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

  @ManyToOne(type => User, user => user.jobInterests, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(type => JobListing, jobListing => jobListing.jobInterests)
  jobListing: JobListing;

}