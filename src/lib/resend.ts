import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
    console.warn('RESEND_API_KEY is missing. Reminders will not be sent.');
}

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const emailConfig = {
    from: 'Moonraker AI <onboarding@moonraker.ai>', // Update with verify domain logic
};
