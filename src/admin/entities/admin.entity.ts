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

  @Column({
    type: 'text',
    nullable: true
  })
  createdAt: string;

  @Column({
    type: 'text',
    nullable: true
  })
  createdBy: string;

  @Column({
    type: 'text',
    nullable: true
  })
  updatedAt: string;

  @Column({
    type: 'text',
    nullable: true
  })
  updatedBy: string;

  /** Hashing password before inserting into table */
  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  @AfterInsert()
  async afterInsert() {
    const timestamp = new Date().toISOString();
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
    this.createdBy = this.id;
    this.updatedBy = this.id;
  }


}