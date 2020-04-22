import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { config } from '../../common/config';

@Injectable()
export class MailService {

  SERVER_URL: string;

  constructor(
    private readonly mailerService: MailerService
  ) {
    this.SERVER_URL = config.baseURL;
  }

  sendPassword(email: string, randomPassword: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this
        .mailerService
        .sendMail({
          to: email,
          from: config.from, // sender address
          subject: config.welcomeSubject, // Subject line
          text: `${config.welcomeMessage} ${randomPassword}`, // plaintext body
        })
        .then(() => {
          resolve("Successfully sent email");
        })
        .catch(() => {
          reject("Email sent failed");
        });
    });
  }

  sendForgotPassword(email: string, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this
        .mailerService
        .sendMail({
          to: email,
          from: config.from, // sender address
          subject: config.forgotPasswordSubject, // Subject line
          text: `${config.forgotPasswordMessage} ${this.SERVER_URL}reset-password?token=${token}`, // plaintext body
        })
        .then(() => {
          resolve("Successfully sent email");
        })
        .catch((error) => {
          console.log('MailService -> error', error);
          reject("Email sent failed");
        });
    });

  }

}
