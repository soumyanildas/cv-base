import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { JobListing } from 'src/companies/entities/jobListing.entity';

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

  @ManyToMany(type => User, user => user.jobInterests)
  @JoinColumn({ name: 'userId' })
  users: User[];

  @ManyToOne(type => JobListing, jobListing => jobListing.jobInterests)
  jobListing: JobListing;

}