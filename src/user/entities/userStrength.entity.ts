import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Strength } from './strength.entity';

@Entity()
export class UserStrength {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => User, user => user.strengths)
  user: User;

  @ManyToOne(type => Strength, strength => strength.strengths, { cascade: true, eager: true })
  strength: Strength;

}