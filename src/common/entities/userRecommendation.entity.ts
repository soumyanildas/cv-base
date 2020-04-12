import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Company } from '../../company/entities/company.entity';

export enum RecommendationType {
  text = 'text',
  sound = 'sound'
}

@Entity()
export class UserRecommendation {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true
  })
  recommendation: string;

  @Column({
    type: 'enum',
    enum: RecommendationType,
    nullable: true
  })
  recommendationType: string;

  @Column({
    type: 'boolean',
    default: false
  })
  isRecommendationGiven: boolean;

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

  @ManyToOne(type => User, user => user.recommendations)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(type => User, user => user.recommended)
  @JoinColumn({ name: 'recommendedById' })
  recommendedBy: User;

  @ManyToOne(type => Company, company => company.recommendations)
  @JoinColumn({ name: 'companyId' })
  company: Company;

}
