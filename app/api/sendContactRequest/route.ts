import { ServiceRequest } from '@/components/scripts/email/ServiceRequest';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { PrismaClient, User } from "@prisma/client"
const db = new PrismaClient();

const resend = new Resend(process.env.RESEND_AIP_KEY);


export async function POST(req: Request) {
  try {
    const user : Partial<User> | null = await db.user.findFirst({where: {access: 1}, select: {
      userID: true,name: true,email: true,phone: true,access: true,facebook: true,instagram: true,pinterest: true,
    }});
    
    const body = await req.json()
    console.log("body", body)
    const {name,email,phone,tags,message,} = body
    const data = await resend.emails.send({
      from: 'contactrequest@info.jacobmiranda.com',
      to: ['contact@jacobmiranda.com', `${user?.email}`],
      subject: 'Whimsy Decor | Contact Request',
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
