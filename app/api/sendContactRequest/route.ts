import { ServiceRequest } from '@/components/scripts/email/ServiceRequest';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_AIP_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("body", body)
    const {name,email,phone,tags,message,} = body
    const data = await resend.emails.send({
      from: 'contactrequest@info.jacobmiranda.com',
      to: ['contact@jacobmiranda.com'],
      subject: 'New Service Request',
      react: ServiceRequest({
        name: name,
        email: email,
        phone: phone, 
        tags: tags,
        message: message, 
      }),
      text: `You have a new contact request: \r\n`
      + `Name: ${name} \r\n`
      + `Email: ${email} \r\n`
      + `Phone: ${phone} \r\n`
      + `Tags: ${tags} \r\n`
      + `Message: ${message} \r\n`
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
