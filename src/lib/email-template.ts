interface EmailTemplateProps {
    url: string;
    host: string;
}

export function emailTemplate({ url, host }: EmailTemplateProps) {
    const escapedHost = host.replace(/\./g, "&#8203;.");

    return `
        <!DOCTYPE html>
        <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
            <meta charset="utf-8">
            <meta name="x-apple-disable-message-reformatting">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
            <title>Verify your email</title>
            <style>
                @media (max-width: 600px) {
                    .button {
                        width: 100% !important;
                        text-align: center !important;
                    }
                }
                @media (prefers-color-scheme: dark) {
                    body {
                        background-color: #1b1b1b !important;
                        color: #fff !important;
                    }
                    .email-wrapper {
                        background-color: #1b1b1b !important;
                    }
                    .email-content {
                        background-color: #2b2b2b !important;
                    }
                }
            </style>
        </head>
        <body style="margin: 0; width: 100%; padding: 0; -webkit-font-smoothing: antialiased; word-break: break-word">
            <div class="email-wrapper" style="background-color: #f5f5f5; padding: 20px">
                <div class="email-content" style="background-color: #ffffff; border-radius: 8px; padding: 40px; margin: 0 auto; max-width: 600px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)">
                    <h1 style="color: #333; font-size: 24px; font-weight: bold; margin: 0 0 20px; text-align: center">
                        Welcome to Speedisha
                    </h1>
                    
                    <p style="color: #666; font-size: 16px; line-height: 24px; margin: 0 0 30px; text-align: center">
                        Click the button below to verify your email address and get started.
                    </p>
                    
                    <div style="text-align: center; margin: 0 0 30px">
                        <a href="${url}" class="button" style="background-color: #0070f3; border-radius: 4px; color: #ffffff; display: inline-block; font-size: 16px; font-weight: bold; line-height: 1; padding: 15px 30px; text-decoration: none">
                            Verify Email
                        </a>
                    </div>
                    
                    <p style="color: #999; font-size: 14px; line-height: 24px; margin: 0; text-align: center">
                        If you didn't request this email, you can safely ignore it.
                    </p>
                    
                    <div style="border-top: 1px solid #e6e6e6; margin-top: 30px; padding-top: 30px">
                        <p style="color: #999; font-size: 12px; line-height: 24px; margin: 0; text-align: center">
                            This email was sent from ${escapedHost}
                        </p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
}

export function getEmailTemplate(url: string): string {
    const host = new URL(url).host;
    return emailTemplate({ url, host });
}
