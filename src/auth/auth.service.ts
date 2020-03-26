
import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as generator from 'generate-password';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { LoginDto } from 'src/users/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  /**
   * @description Create a basic user (and a company if user is an employer)
   * @param createUserDto DTO for encapsulating User
   */
  async register(createUserDto: CreateUserDto): Promise<any> {
    const randomPassword = this.generateRandomPassword();
    createUserDto.password = randomPassword;
    const user: any = createUserDto;
    if (user.userType === 'candidate' && user.hasOwnProperty('company')) {
      delete user.company;
    }
    // Creating an instance of User to bind "this" for hooks
    const entity = Object.assign(new User(), user);
    const userResponse = await this.usersRepository.save(entity);
    return {
      ...userResponse,
      password: randomPassword // Sending for development purpose only; Will be sent in an email later on
    };
  }

  /**
   * @description Calls facebook graph API with the access_token and gets back a response
   * with the email. If user with email exists, login function is called, otherwise user is registered.
   * @param createUserDto DTO for encapsulating User
   */
  async facebookRegister(createUserDto: CreateUserDto) {
    try {
      const facebookResponse = await axios.get(`https://graph.facebook.com/v2.10/me?fields=name,email&access_token=${createUserDto.access_token}`);
      const { email } = facebookResponse.data;
      const userResponse = await this.usersRepository.findOne({ email });
      if (userResponse) {
        const payload = { email: userResponse.email, firstName: userResponse.firstName, lastName: userResponse.lastName };
        return {
          accessToken: this.jwtService.sign(payload),
          email: userResponse.email,
          firstName: userResponse.firstName,
          lastName: userResponse.lastName
        };
      } else {
        createUserDto.email = email;
        return await this.register(createUserDto);
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
  async login(loginDto: LoginDto) {
    const userResponse = await this.usersRepository.findOne({ email: loginDto.email });
    if (userResponse && userResponse.loginType === 'email') {
      const isPasswordValid = await bcrypt.compare(loginDto.password, userResponse.password);
      if (isPasswordValid) {
        const payload = { email: userResponse.email, firstName: userResponse.firstName, lastName: userResponse.lastName };
        return {
          accessToken: this.jwtService.sign(payload),
          email: userResponse.email,
          firstName: userResponse.firstName,
          lastName: userResponse.lastName
        };
      }
      throw new HttpException('Credentials mismatch.', 401);
    } else {
      throw new HttpException('Please try logging with a social account.', 400);
    }
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
