import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {

  constructor(
    private readonly mailerService: MailerService
  ) { }

  sendPassword(email: string, randomPassword: string) {
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
    })
  }

}
