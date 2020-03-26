import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { JobType } from './jobType.entity';

@Entity()
export class UserJobType {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'numeric',
  })
  experience: number;

  @ManyToOne(type => User, user => user.jobTypes)
  user: User;

  @ManyToOne(type => JobType, jobType => jobType.jobTypes, { cascade: true, eager: true })
  jobType: JobType;

}