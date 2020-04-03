import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {

  SERVER_URL: string;

  constructor(
    private readonly mailerService: MailerService
  ) {
    this.SERVER_URL = 'http://localhost:4000/reset-password';
  }

  sendPassword(email: string, randomPassword: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this
        .mailerService
        .sendMail({
          to: email,
          from: 'noreply@soumyanildas.com', // sender address
          subject: 'MA12 CV Base - Welcome', // Subject line
          text: `Welcome to MA12 CV Base. Here is your password ${randomPassword}`, // plaintext body
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
          from: 'noreply@soumyanildas.com', // sender address
          subject: 'MA12 CV Base - Reset Password', // Subject line
          text: `Please reset your password by following this link: ${this.SERVER_URL}?token=${token}`, // plaintext body
        })
        .then(() => {
          resolve("Successfully sent email");
        })
        .catch(() => {
          reject("Email sent failed");
        });
    });

  }

}
