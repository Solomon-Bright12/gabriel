import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, type } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const inquiryLabel: Record<string, string> = {
      acquisition: 'Artwork Acquisition',
      commission: 'Custom Commission',
      viewing: 'Private Viewing',
      curation: 'Curation & Placement',
      press: 'Press & Media',
      other: 'Other',
    };

    const inquiryType = type ? (inquiryLabel[type] ?? type) : 'Not specified';

    // Email to the artist
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Portfolio Inquiry] ${subject}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0B0B0C; color: #fff; padding: 40px; border-radius: 4px;">
          <div style="border-bottom: 1px solid rgba(212,175,55,0.3); padding-bottom: 24px; margin-bottom: 24px;">
            <h1 style="font-size: 24px; color: #D4AF37; margin: 0 0 8px;">New Portfolio Inquiry</h1>
            <p style="color: #666; font-size: 13px; margin: 0; font-family: Inter, sans-serif;">Received via gabrielbarclay.vercel.app</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-family: Inter, sans-serif; font-size: 14px;">
            <tr>
              <td style="color: #888; padding: 10px 0; width: 130px; vertical-align: top;">FROM</td>
              <td style="color: #fff; padding: 10px 0;">${name}</td>
            </tr>
            <tr>
              <td style="color: #888; padding: 10px 0; vertical-align: top;">REPLY TO</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #D4AF37;">${email}</a></td>
            </tr>
            <tr>
              <td style="color: #888; padding: 10px 0; vertical-align: top;">INQUIRY TYPE</td>
              <td style="color: #fff; padding: 10px 0;">${inquiryType}</td>
            </tr>
            <tr>
              <td style="color: #888; padding: 10px 0; vertical-align: top;">SUBJECT</td>
              <td style="color: #fff; padding: 10px 0;">${subject}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 24px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 4px;">
            <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-family: Inter, sans-serif; margin: 0 0 12px;">MESSAGE</p>
            <p style="color: #ccc; line-height: 1.7; font-family: Inter, sans-serif; font-size: 14px; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06);">
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background: #D4AF37; color: #0B0B0C; text-decoration: none; padding: 12px 28px; font-family: Inter, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 2px;">Reply to ${name}</a>
          </div>
        </div>
      `,
    });

    // Auto-reply to the sender
    await transporter.sendMail({
      from: `"Gabriel Barclay | Artist" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Thank you for your inquiry — ${subject}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0B0B0C; color: #fff; padding: 40px; border-radius: 4px;">
          <div style="border-bottom: 1px solid rgba(212,175,55,0.3); padding-bottom: 24px; margin-bottom: 24px;">
            <h1 style="font-size: 24px; color: #D4AF37; margin: 0 0 8px;">Gabriel Barclay</h1>
            <p style="color: #666; font-size: 12px; margin: 0; font-family: Inter, sans-serif; text-transform: uppercase; letter-spacing: 0.1em;">Traditional & Digital Artist</p>
          </div>

          <p style="color: #ccc; font-size: 16px; line-height: 1.7; margin: 0 0 20px;">Dear ${name},</p>
          <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">Thank you for reaching out. I have received your message regarding <strong style="color: #fff;">"${subject}"</strong> and will respond personally within 24–48 hours.</p>
          <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0 0 32px;">In the meantime, feel free to browse the full collection or reach me directly on WhatsApp for a faster response.</p>

          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="https://wa.me/231880158739" style="display: inline-block; background: #25D366; color: #fff; text-decoration: none; padding: 12px 24px; font-family: Inter, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; border-radius: 2px; margin-right: 12px;">WhatsApp</a>
            <a href="https://gabriel-barclay.vercel.app" style="display: inline-block; background: rgba(212,175,55,0.15); border: 1px solid rgba(212,175,55,0.4); color: #D4AF37; text-decoration: none; padding: 12px 24px; font-family: Inter, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; border-radius: 2px;">View Gallery</a>
          </div>

          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06);">
            <p style="color: #555; font-size: 12px; font-family: Inter, sans-serif; margin: 0;">This is an automated acknowledgment. Please do not reply to this email directly.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
