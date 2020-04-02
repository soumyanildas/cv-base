import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class UserCompany {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true
  })
  role: string;

  @ManyToOne(type => User, user => user.userCompanies)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(type => Company, company => company.userCompany)
  @JoinColumn({ name: 'companyId' })
  company: Company;

}