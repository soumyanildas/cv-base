import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/companies/entities/company.entity';

@Entity()
export class UserCompanyFollow {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(type => User, user => user.companiesFollowing)
  @JoinColumn({ name: 'userId '})
  users: User[];

  @ManyToMany(type => Company, user => user.usersFollowing)
  @JoinColumn({ name: 'companyId '})
  companies: Company[];

}