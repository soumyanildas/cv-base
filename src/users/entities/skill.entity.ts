import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserSkill } from './userSkill.entity';


@Entity('skills')
export class Skill {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true
  })
  skillName: string;

  @OneToMany(type => UserSkill, userSkill => userSkill.skill)
  skills: UserSkill[];
}