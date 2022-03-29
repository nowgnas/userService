import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';

interface EmailOptios {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transpoter: Mail;

  constructor() {
    //   > nodemailer에서 제공하는 Transporter 객체를 생성합니다.
    this.transpoter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'marshmello.sw@gmail.com',
        pass: 'dltkddnjs!!',
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = 'http://localhost:3000'; //TODO: config

    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const mailOptions: EmailOptios = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
        <form action="${url}" method="POST">
          <button>가입확인</button>
        </form>
        `,
    };
    return await this.transpoter.sendMail(mailOptions);
  }
}
