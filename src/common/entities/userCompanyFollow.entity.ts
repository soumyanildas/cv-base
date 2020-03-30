import { Entity, PrimaryGeneratedColumn,  JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class UserCompanyFollow {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => User, user => user.companiesFollowing)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(type => Company, user => user.usersFollowing)
  @JoinColumn({ name: 'companyId' })
  company: Company;

}