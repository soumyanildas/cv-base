import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Skill } from './entities/skill.entity';
import { UserSkill } from './entities/userSkill.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Skill, UserSkill])
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
