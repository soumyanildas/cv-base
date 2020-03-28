import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinColumn } from 'typeorm';
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

  @OneToMany(type => User, user => user.userCompany)
  @JoinColumn({ name: 'userId '})
  users: User[];

  @ManyToMany(type => Company, user => user.userCompany)
  @JoinColumn({ name: 'companyId '})
  companies: Company[];

}