import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const AGENCY_NOTIFICATION_EMAIL = process.env.AGENCY_NOTIFICATION_EMAIL || 'leads@alphalinkx.com';

let transporter: nodemailer.Transporter | null = null;

if (SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

export async function sendInquiryNotification(inquiry: {
  name: string;
  email: string;
  company?: string | null;
  service: string;
  budget?: string | null;
  timeline?: string | null;
  description: string;
}) {
  const subject = `🚀 New Lead: ${inquiry.name} (${inquiry.company || 'Direct Client'}) — ${inquiry.service}`;
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #0B0D13; color: #FFFFFF; padding: 24px; border-radius: 8px;">
      <h2 style="color: #FC6603; margin-top: 0;">New Project Inquiry Received</h2>
      <p style="color: #94A3B8;">A prospective client submitted an inquiry on <strong>Alphalinkx.com</strong>.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px; color: #94A3B8; width: 140px;">Client Name:</td><td style="padding: 8px; color: #FFF; font-weight: bold;">${inquiry.name}</td></tr>
        <tr><td style="padding: 8px; color: #94A3B8;">Email:</td><td style="padding: 8px; color: #FC6603;"><a href="mailto:${inquiry.email}" style="color: #FC6603;">${inquiry.email}</a></td></tr>
        <tr><td style="padding: 8px; color: #94A3B8;">Company:</td><td style="padding: 8px; color: #FFF;">${inquiry.company || 'N/A'}</td></tr>
        <tr><td style="padding: 8px; color: #94A3B8;">Service Needed:</td><td style="padding: 8px; color: #FFF; font-weight: bold;">${inquiry.service}</td></tr>
        <tr><td style="padding: 8px; color: #94A3B8;">Budget Range:</td><td style="padding: 8px; color: #FFF;">${inquiry.budget || 'Not specified'}</td></tr>
        <tr><td style="padding: 8px; color: #94A3B8;">Target Timeline:</td><td style="padding: 8px; color: #FFF;">${inquiry.timeline || 'Not specified'}</td></tr>
      </table>

      <div style="margin-top: 20px; padding: 16px; background-color: #161A26; border-left: 4px solid #FC6603; border-radius: 4px;">
        <h4 style="margin: 0 0 8px 0; color: #FC6603;">Project Description:</h4>
        <p style="margin: 0; color: #CBD5E1; white-space: pre-wrap; line-height: 1.6;">${inquiry.description}</p>
      </div>

      <p style="margin-top: 24px; font-size: 12px; color: #64748B;">Alphalinkx Agency Lead Dispatch System · Autonomous Notification Engine</p>
    </div>
  `;

  if (!transporter) {
    console.log('\n📨 [EMAIL SIMULATION — AGENCY NOTIFICATION]');
    console.log(`To: ${AGENCY_NOTIFICATION_EMAIL}`);
    console.log(`Subject: ${subject}`);
    console.log(`Lead: ${inquiry.name} <${inquiry.email}> | Service: ${inquiry.service} | Budget: ${inquiry.budget}`);
    console.log('--------------------------------------------------\n');
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"Alphalinkx Leads" <${SMTP_USER}>`,
      to: AGENCY_NOTIFICATION_EMAIL,
      subject,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to dispatch agency notification email:', error);
    return { success: false, error };
  }
}

export async function sendClientConfirmation(client: { name: string; email: string; service: string }) {
  const subject = `Thank you for contacting Alphalinkx — We have received your inquiry`;
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #060709; color: #FFFFFF; padding: 32px; border-radius: 8px; max-width: 600px;">
      <h2 style="color: #FC6603; margin-top: 0; font-size: 24px;">Alphalinkx Digital Agency</h2>
      <p style="color: #F8FAFC; font-size: 16px;">Hello ${client.name},</p>
      <p style="color: #94A3B8; line-height: 1.6;">
        Thank you for reaching out to <strong>Alphalinkx</strong>. We have successfully received your project inquiry regarding <strong>${client.service}</strong>.
      </p>
      <p style="color: #94A3B8; line-height: 1.6;">
        Our leadership team reviews every brief carefully. We will evaluate your requirements and reach out within <strong>24 business hours</strong> to discuss your objectives and schedule an initial discovery consultation.
      </p>
      <div style="margin: 24px 0; padding: 16px; background-color: #10131C; border-radius: 6px; border: 1px solid rgba(252, 102, 3, 0.2);">
        <p style="margin: 0; color: #FC6603; font-weight: bold;">In the meantime:</p>
        <p style="margin: 8px 0 0 0; color: #94A3B8; font-size: 14px;">Feel free to explore our recent case studies and architectural breakdowns on our website.</p>
      </div>
      <p style="color: #64748B; font-size: 14px; margin-top: 24px;">
        Warm regards,<br/>
        <strong style="color: #FFFFFF;">The Alphalinkx Strategy & Engineering Team</strong><br/>
        <a href="https://alphalinkx.com" style="color: #FC6603; text-decoration: none;">alphalinkx.com</a>
      </p>
    </div>
  `;

  if (!transporter) {
    console.log('\n📨 [EMAIL SIMULATION — CLIENT ACKNOWLEDGEMENT]');
    console.log(`To: ${client.email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Recipient: ${client.name} | Confirmed inquiry for: ${client.service}`);
    console.log('--------------------------------------------------\n');
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"Alphalinkx Team" <${SMTP_USER}>`,
      to: client.email,
      subject,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to dispatch client confirmation email:', error);
    return { success: false, error };
  }
}
