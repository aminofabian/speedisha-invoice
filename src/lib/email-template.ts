interface EmailTemplateProps {
  verificationUrl: string;
}

export function EmailTemplate({ verificationUrl }: EmailTemplateProps) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify your email - Speedisha</title>
        <style>
          body {
            font-family: Georgia, serif;
            line-height: 1.6;
            color: #020817;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
          }
          .hero {
            background: linear-gradient(135deg, #518b03 0%, #3d6802 100%);
            color: white;
            padding: 48px 32px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 100%;
            background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
            z-index: 1;
          }
          .hero::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 120px;
            background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.2) 100%);
            z-index: 1;
          }
          .logo {
            margin-bottom: 32px;
            display: inline-flex;
            align-items: center;
            gap: 16px;
            position: relative;
            z-index: 2;
          }
          .logo-icon {
            width: 48px;
            height: 48px;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            position: relative;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .logo-icon::after {
            content: '';
            position: absolute;
            inset: -2px;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%);
            border-radius: 14px;
            filter: blur(8px);
            opacity: 0.5;
            z-index: -1;
          }
          .logo-text {
            font-family: 'Orbitron', Georgia, serif;
            font-size: 28px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.02em;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .hero-title {
            font-family: 'Orbitron', Georgia, serif;
            font-size: 36px;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 16px;
            line-height: 1.2;
            letter-spacing: -0.02em;
            position: relative;
            z-index: 2;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
          .hero-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 18px;
            line-height: 1.6;
            margin: 0;
            position: relative;
            z-index: 2;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
          }
          .content {
            padding: 40px 32px;
            text-align: center;
            background: #ffffff;
            position: relative;
          }
          .verification-box {
            background: #ffffff;
            border: 1px solid rgba(81, 139, 3, 0.15);
            border-radius: 16px;
            padding: 40px 32px;
            margin: -80px 24px 32px;
            position: relative;
            z-index: 1;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .verification-box::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(81, 139, 3, 0.05) 0%, rgba(81, 139, 3, 0.02) 100%);
            border-radius: 16px;
            z-index: -1;
          }
          .verification-icon {
            width: 64px;
            height: 64px;
            background: rgba(81, 139, 3, 0.1);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            color: #518b03;
            font-size: 28px;
            backdrop-filter: blur(8px);
            border: 1px solid rgba(81, 139, 3, 0.2);
            position: relative;
          }
          .verification-icon::after {
            content: '';
            position: absolute;
            inset: -2px;
            background: linear-gradient(135deg, #518b03 0%, #3d6802 100%);
            border-radius: 14px;
            filter: blur(8px);
            opacity: 0.1;
            z-index: -1;
          }
          .verification-title {
            font-family: Georgia, serif;
            font-size: 24px;
            font-weight: 600;
            color: #1a1a1a;
            margin: 0 0 16px;
            letter-spacing: -0.01em;
          }
          .verification-box p {
            font-family: Georgia, serif;
            color: #4a5568;
            font-size: 16px;
            line-height: 1.6;
            margin: 0 0 32px;
            max-width: 440px;
            margin-left: auto;
            margin-right: auto;
          }
          .button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #e4661c 0%, #ff7a30 100%);
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin-top: 8px;
            position: relative;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            border: none;
            font-family: Georgia, serif;
          }
          .button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(228, 102, 28, 0.25);
          }
          .button-glow {
            position: absolute;
            inset: -2px;
            background: linear-gradient(135deg, #e4661c 0%, #ff7a30 100%);
            border-radius: 10px;
            filter: blur(8px);
            opacity: 0.3;
            z-index: -1;
          }
          .features {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
            margin: 40px 0;
            text-align: left;
          }
          .feature {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            padding: 20px;
            background: rgba(81, 139, 3, 0.03);
            border: 1px solid rgba(81, 139, 3, 0.1);
            border-radius: 12px;
            transition: transform 0.2s ease;
          }
          .feature:hover {
            transform: translateY(-2px);
          }
          .feature-icon {
            width: 40px;
            height: 40px;
            background: rgba(81, 139, 3, 0.1);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            flex-shrink: 0;
            backdrop-filter: blur(8px);
            border: 1px solid rgba(81, 139, 3, 0.2);
            position: relative;
          }
          .feature-icon::after {
            content: '';
            position: absolute;
            inset: -2px;
            background: linear-gradient(135deg, #518b03 0%, #3d6802 100%);
            border-radius: 12px;
            filter: blur(8px);
            opacity: 0.1;
            z-index: -1;
          }
          .feature-text {
            font-family: Georgia, serif;
            margin: 0;
            font-size: 14px;
            color: #4a5568;
            line-height: 1.5;
          }
          @media (max-width: 600px) {
            .features {
              grid-template-columns: 1fr;
              gap: 16px;
            }
          }
          .security-note {
            margin: 32px 0;
            padding: 24px;
            background-color: #fffbeb;
            border: 1px solid #fef3c7;
            border-radius: 12px;
            text-align: left;
          }
          .security-note h2 {
            font-size: 16px;
            color: #92400e;
            margin: 0 0 8px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .security-note h2::before {
            content: "!";
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            background: #92400e;
            color: #ffffff;
            border-radius: 50%;
            font-size: 14px;
          }
          .security-note p {
            margin: 0;
            font-size: 14px;
            color: #92400e;
          }
          .footer {
            background: #f8fafc;
            padding: 32px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }
          .footer p {
            font-family: Georgia, serif;
            margin: 4px 0;
            color: #718096;
            font-size: 14px;
          }
          @media (prefers-color-scheme: dark) {
            body {
              background-color: #020817;
            }
            .container {
              background-color: #0f172a;
            }
            .content {
              background-color: #0f172a;
            }
            .verification-box {
              background-color: #1e293b;
              border-color: #334155;
            }
            .verification-title {
              color: #f8fafc;
            }
            .feature-text {
              color: #94a3b8;
            }
            .security-note {
              background-color: rgba(146, 64, 14, 0.1);
              border-color: rgba(146, 64, 14, 0.2);
            }
            .footer {
              background-color: #1e293b;
              border-color: #334155;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          
          <div class="content">
            <div class="verification-box">
              <div class="verification-icon" style="font-family: sans-serif;">✉️</div>
              <h2 class="verification-title">Verify Your Email Address</h2>
              <p>Please click the button below to verify your email and get started with your account.</p>
              
              <a href="${verificationUrl}" class="button">
                <div class="button-glow"></div>
                Verify Email Address
              </a>
            </div>

            <div class="features">
              <div class="feature">
                <div class="feature-icon" style="font-family: sans-serif;">📝</div>
                <p class="feature-text">Create professional invoices with customizable templates</p>
              </div>
              <div class="feature">
                <div class="feature-icon" style="font-family: sans-serif;">🔄</div>
                <p class="feature-text">Set up recurring invoices and automatic reminders</p>
              </div>
              <div class="feature">
                <div class="feature-icon" style="font-family: sans-serif;">📊</div>
                <p class="feature-text">Track payments and generate detailed reports</p>
              </div>
              <div class="feature">
                <div class="feature-icon" style="font-family: sans-serif;">🌐</div>
                <p class="feature-text">Accept payments in multiple currencies</p>
              </div>
            </div>
            
            <div class="security-note">
              <h2>Security Notice</h2>
              <p>If you didn't request this email, you can safely ignore it. Your email address will not be verified unless you click the button above.</p>
            </div>
          </div>
          
          <div class="footer">
            <p> 2024 Speedisha. All rights reserved.</p>
            <p>This email was sent from localhost:3000</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

interface ProjectInquiryData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  projectDetails?: string;
}

export const generateProjectInquiryEmail = (data: ProjectInquiryData) => {
  const { name, email, phone, company, message, projectDetails } = data;
  const details = message || projectDetails;
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Project Inquiry - Speedisha</title>
        <style>
          body {
            font-family: Georgia, serif;
            line-height: 1.6;
            color: #2d3748;
            background-color: #f7fafc;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #518b03 0%, #3d6802 100%);
            color: white;
            padding: 32px 20px;
            text-align: center;
            position: relative;
          }
          .header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.1) 100%);
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
            font-family: 'Orbitron', Georgia, serif;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header p {
            margin: 8px 0 0;
            opacity: 0.9;
            font-size: 16px;
          }
          .logo {
            margin-bottom: 20px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
          }
          .logo-icon {
            width: 48px;
            height: 48px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 700;
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #ffffff;
            line-height: 48px;
            text-align: center;
            vertical-align: middle;
          }
          .logo-text {
            font-family: 'Orbitron', Georgia, serif;
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
            line-height: 48px;
            display: inline-flex;
            align-items: center;
          }
          .content {
            padding: 32px 24px;
          }
          .field {
            margin-bottom: 24px;
            border-bottom: 1px solid #edf2f7;
            padding-bottom: 16px;
          }
          .field:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: 600;
            color: #518b03;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
            font-family: Georgia, serif;
          }
          .value {
            color: #2d3748;
            font-size: 16px;
            line-height: 1.6;
            font-family: Georgia, serif;
          }
          .message-box {
            background: #f7faf3;
            border-left: 4px solid #518b03;
            padding: 20px;
            border-radius: 8px;
            margin-top: 24px;
          }
          .message-box .label {
            color: #518b03;
            margin-bottom: 12px;
          }
          .message-box .value {
            white-space: pre-line;
            color: #4a5568;
          }
          .footer {
            text-align: center;
            padding: 24px;
            background: #f8fafc;
            border-top: 1px solid #edf2f7;
          }
          .footer p {
            margin: 4px 0;
            color: #718096;
            font-size: 14px;
          }
          .contact-info {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid #edf2f7;
            text-align: center;
            font-size: 14px;
            color: #718096;
          }
          .contact-info a {
            color: #e4661c;
            text-decoration: none;
          }
          .highlight {
            color: #518b03;
            font-weight: 600;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background: #e4661c;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-family: Georgia, serif;
            margin-top: 16px;
            text-align: center;
            position: relative;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }
          .button::after {
            content: '';
            position: absolute;
            inset: -2px;
            background: linear-gradient(135deg, #e4661c 0%, #ff7a30 100%);
            border-radius: 8px;
            filter: blur(8px);
            opacity: 0.3;
            z-index: -1;
          }
          @media (prefers-color-scheme: dark) {
            body {
              background-color: #020817;
              color: #f8fafc;
            }
            .container {
              background-color: #0f172a;
            }
            .value {
              color: #e2e8f0;
            }
            .message-box {
              background-color: rgba(81, 139, 3, 0.1);
            }
            .message-box .value {
              color: #e2e8f0;
            }
            .footer {
              background-color: #1e293b;
              border-color: #334155;
            }
            .field {
              border-color: #334155;
            }
            .contact-info {
              border-color: #334155;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <div class="logo-icon">S</div>
              <div class="logo-text">Speedisha</div>
            </div>
            <h1>New Project Inquiry</h1>
            <p>We've received a new message from your website</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">From</div>
              <div class="value highlight">${name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email Address</div>
              <div class="value">
                <a href="mailto:${email}" style="color: #e4661c; text-decoration: none;">
                  ${email}
                </a>
              </div>
            </div>
            
            ${phone ? `
            <div class="field">
              <div class="label">Phone Number</div>
              <div class="value">
                <a href="tel:${phone}" style="color: #e4661c; text-decoration: none;">
                  ${phone}
                </a>
              </div>
            </div>
            ` : ''}
            
            ${company ? `
            <div class="field">
              <div class="label">Company</div>
              <div class="value">${company}</div>
            </div>
            ` : ''}
            
            <div class="message-box">
              <div class="label">Message</div>
              <div class="value">${details?.replace(/\n/g, '<br>') || ''}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This is an automated message from your website's contact form.</p>
            <p><strong>Speedisha</strong> - Professional Invoicing Solutions</p>
            
            <div class="contact-info">
              <p>Need help? Contact us:</p>
              <p>
                Email: <a href="mailto:support@speedisha.com">support@speedisha.com</a><br>
                Phone: <a href="tel:+1234567890">+1 (234) 567-890</a>
              </p>
              <a href="https://speedisha.com" class="button">Visit Our Website</a>
            </div>
            
            <p style="margin-top: 24px; font-size: 12px; color: #a0aec0;">
              &copy; ${new Date().getFullYear()} Speedisha. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
};
