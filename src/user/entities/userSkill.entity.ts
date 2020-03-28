import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Skill } from './skill.entity';

@Entity()
export class UserSkill {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true
  })
  media: string;

  @Column({
    type: 'text',
    nullable: true
  })
  comment: string;

  @ManyToOne(type => User, user => user.skills)
  user: User;

  @ManyToOne(type => Skill, skill => skill.skills, { cascade: true, eager: true })
  skill: Skill;

}