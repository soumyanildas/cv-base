
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Repository, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { LoginDto } from '../user/dto/login.dto';

import * as generator from 'generate-password';
import * as bcrypt from 'bcryptjs';
import axios from 'axios';
import { Admin } from 'src/admin/entities/admin.entity';
import { FacebookDto } from 'src/user/dto/facebook.dto';
import { MailService } from 'src/services/mail/mail.service';
import { Company } from 'src/company/entities/company.entity';
import { UserCompany } from 'src/common/entities/userCompany.entity';
import { ForgotPasswordDto } from 'src/company/dto/forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
    @InjectRepository(UserCompany) private readonly userCompanyRepository: Repository<UserCompany>,
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) { }

  /**
   * @description Create a basic user (and a company if user is an employer)
   * @param createUserDto DTO for encapsulating User
   */
  async register(createUserDto: CreateUserDto): Promise<any> {
    let randomPassword, company;
    if (createUserDto.loginType !== 'facebook') {
      randomPassword = this.generateRandomPassword();
      createUserDto.password = randomPassword;
    }
    const user: any = createUserDto;
    if (user.userType === 'candidate' && user.hasOwnProperty('company')) {
      delete user.company;
    }
    if (user.userType === 'employer') {
      // checking if company with same name exists, if so no new company is created
      company = await this.companyRepository.findOne({ where: { companyName: user.company.companyName } });
      if (company) {
        delete user.company;
      }
    }
    // Creating an instance of User to bind "this" for hooks
    const entity = Object.assign(new User(), user);
    const userResponse = await this.userRepository.save(entity);
    this.mailService.sendPassword(createUserDto.email, randomPassword);
    // checking if user is an employer, then insert him into user-company table
    if (user.userType === 'employer') {
      const userCompany = {
        user: userResponse,
        company: userResponse.company
      };
      const entity = Object.assign(new UserCompany(), userCompany);
      await this.userCompanyRepository.save(entity);
    }
    return userResponse;
  }

  /**
   * @description Calls facebook graph API with the access_token and gets back a response
   * with the email. If user with email exists, login function is called, otherwise user is registered.
   * @param createUserDto DTO for encapsulating User
   */
  async facebookRegister(facebookDto: FacebookDto): Promise<any> {
    try {
      const facebookResponse = await axios.get(`https://graph.facebook.com/v2.10/me?fields=name,email&access_token=${facebookDto.access_token}`);
      const { email } = facebookResponse.data;
      const userResponse = await this.userRepository
        .findOne({
          where: { email },
          relations: ['company']
        });
      // If user exists then generate jwt token and send a response back with the jwt token
      if (userResponse) {
        if (userResponse.userType === 'employer' && !userResponse.company.isActive) {
          throw new HttpException('Account not activated yet. Please contact administrator.', HttpStatus.BAD_REQUEST);
        }
        const payload = { id: userResponse.id, email: userResponse.email, userType: userResponse.userType };
        return {
          accessToken: this.jwtService.sign(payload),
          email: userResponse.email,
          firstName: userResponse.firstName,
          lastName: userResponse.lastName
        };
      } else {
        return {
          email
        };
      }
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  /**
   * @description Searches for a user by their email, compares the encrypted password
   * with the password sent, if matches, sends back a jwt token as response
   * @param loginDto DTO for encapsulating Login details
   */
  async loginUser(loginDto: LoginDto): Promise<any> {
    const userResponse = await getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.company', 'company')
      .addSelect('user.password')
      .where('user.email = :email', { email: loginDto.email })
      .getOne()
    if (userResponse) {
      if (userResponse.loginType === 'email') {
        if (userResponse.userType === 'employer' && !userResponse.company.isActive && !userResponse.isActive) {
          throw new HttpException('Account not activated yet. Please contact administrator.', HttpStatus.BAD_REQUEST);
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, userResponse.password);
        if (isPasswordValid) {
          const payload = { id: userResponse.id, email: userResponse.email, userType: userResponse.userType };
          return {
            accessToken: this.jwtService.sign(payload),
            email: userResponse.email,
            firstName: userResponse.firstName,
            lastName: userResponse.lastName
          };
        }
        throw new HttpException('Credentials mismatch.', HttpStatus.UNPROCESSABLE_ENTITY);
      }
      throw new HttpException('Please try logging with a social account.', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
  }

  /**
   * @description Searches for an admin by their email, compares the encrypted password
   * with the password sent, if matches, sends back a jwt token as response
   * @param loginDto DTO for encapsulating Login details
   */
  async loginAdmin(loginDto: LoginDto): Promise<any> {
    const userResponse = await getRepository(Admin)
      .createQueryBuilder('admin')
      .addSelect('admin.password')
      .where('admin.email = :email', { email: loginDto.email })
      .getOne()
    if (userResponse) {
      const isPasswordValid = await bcrypt.compare(loginDto.password, userResponse.password);
      if (isPasswordValid) {
        const payload = { id: userResponse.id, email: userResponse.email, userType: userResponse.userType, firstName: userResponse.firstName, lastName: userResponse.lastName };
        return {
          accessToken: this.jwtService.sign(payload),
          email: userResponse.email,
          firstName: userResponse.firstName,
          lastName: userResponse.lastName
        };
      }
      throw new HttpException('Credentials mismatch.', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
  }

  async userForgotPasssword(forgotPasswordDto: ForgotPasswordDto): Promise<any> {
    const userResponse = await this.userRepository
      .findOne({
        email: forgotPasswordDto.email
      });
    if (!userResponse) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    try {
      const payload = { id: userResponse.id, email: userResponse.email, userType: 'user' };
      const token = this.jwtService.sign(payload);
      return await this.mailService.sendForgotPassword(forgotPasswordDto.email, token);
    } catch (error) {
      console.log('ma12forgotpasscheck', error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async adminForgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<any> {
    const adminResponse = await this.adminRepository
      .findOne({
        email: forgotPasswordDto.email
      });
    if (!adminResponse) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }
    try {
      const payload = { id: adminResponse.id, email: adminResponse.email, userType: 'admin' };
      const token = this.jwtService.sign(payload);
      return await this.mailService.sendForgotPassword(forgotPasswordDto.email, token);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async resetPassword(password: string, id: string): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await this.userRepository.findOne({ id });
    user.password = hashPassword;
    return await this.userRepository.save(user);
  }


  /**
   * @description Generate a 10 character alphanumeric passwrod
   */
  private generateRandomPassword(): string {
    return generator.generate({
      length: 10,
      numbers: true
    });
  }
}
