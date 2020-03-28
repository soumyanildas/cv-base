import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserEmploymentHistory {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text'
  })
  position: string;

  @Column({
    type: 'date'
  })
  startDate: string;

  @Column({
    type: 'date',
    nullable: true
  })
  endDate: string;

  @Column({
    type: 'boolean',
    default: false
  })
  isCurrentJob: boolean;

  @Column({
    type: 'text'
  })
  companyName: string;

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

  @ManyToOne(type => User, user => user.employmentHistories)
  user: User;

}