import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserJobType } from './userJobType.entity';

@Entity('job_types')
export class JobType {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true
  })
  jobTypeName: string;

  @OneToMany(type => UserJobType, userJobType => userJobType.jobType)
  jobTypes: JobType[];

}