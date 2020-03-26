import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { UserStrength } from './userStrength.entity';

@Entity('strengths')
export class Strength {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true
  })
  strengthName: string;

  @OneToMany(type => UserStrength, userStrength => userStrength.strength)
  strengths: UserStrength[];

}