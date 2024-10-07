import mailjet from './mailjetConfig.js'; // Import the Mailjet client
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from './emailTemplates.js';

export async function sendVerificationEmail(userId, email, name, verificationToken) {
    try {
        const request = await mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: 'singharaj2019@gmail.com',
                            Name: 'Sandip Singha'
                        },
                        To: [
                            {
                                Email: email,
                                Name: name
                            }
                        ],
                        Subject: 'Verify your email',
                        HTMLPart: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
                        CustomID: `Verification-${userId}`,
                    }
                ]
            });
    } catch (error) {
        console.error("Full Error Response:", error.response?.data || error); // Log full error response
        throw new Error(`Error sending verification email: ${error}`);
    }
}

export const sendWelcomeEmail = async function (email, name) {
    // Implementation for sending welcome email
    try {
        const request = await mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: 'singharaj2019@gmail.com',
                            Name: 'Sandip Singha'
                        },
                        To: [
                            {
                                Email: email,
                                Name: name
                            }
                        ],
                        Subject: 'Welcome!',
                        HTMLPart: WELCOME_EMAIL_TEMPLATE,
                    }
                ]
            });
    } catch (error) {
        console.error("Full Error Response:", error.response?.data || error); // Log full error response
        throw new Error(`Error sending welcome email: ${error}`);
    }
}
