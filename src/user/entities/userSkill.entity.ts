import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Skill } from './skill.entity';

export enum mediaType {
  video = 'video',
  image = 'image'
};

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
    type: 'enum',
    enum: mediaType,
    nullable: true
  })
  mediaType: string;

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