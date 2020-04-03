import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, AfterInsert } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('admins')
export class Admin {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true
  })
  firstName: string;

  @Column({
    type: 'text',
    nullable: true
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true
  })
  email: string;

  @Column({
    type: 'text'
  })
  password: string;

  @Column({
    type: 'varchar',
    default: 'admin'
  })
  userType: string;

  /** Hashing password before inserting into table */
  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

}