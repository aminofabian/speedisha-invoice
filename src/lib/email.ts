import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'zelisline@gmail.com',
    pass: process.env.EMAIL_PASS || 'tilz ssmi nhbc atir',
  },
});

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: any;
}

export async function sendVerificationEmail(email: string, url: string): Promise<EmailResult> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'zelisline@gmail.com',
      to: email,
      subject: 'Verify your email for Speedisha',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h1 style="color: #333; text-align: center;">Welcome to Speedisha!</h1>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Thanks for signing up! Please verify your email address by clicking the button below:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${url}" 
               style="background-color: #0070f3; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; font-weight: bold;">
              Verify Email
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            If you didn't create an account with Speedisha, you can safely ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px; text-align: center;">
            ${new Date().getFullYear()} Speedisha. All rights reserved.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(email: string, url: string): Promise<EmailResult> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'zelisline@gmail.com',
      to: email,
      subject: 'Reset your Speedisha password',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h1 style="color: #333; text-align: center;">Reset Your Password</h1>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            We received a request to reset your password. Click the button below to create a new password:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${url}" 
               style="background-color: #0070f3; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            If you didn't request a password reset, you can safely ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px; text-align: center;">
            ${new Date().getFullYear()} Speedisha. All rights reserved.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error };
  }
}
