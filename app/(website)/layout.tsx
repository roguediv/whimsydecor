import type { Metadata } from "next";
import Nav from "@/components/main/Nav";
import Footer from "@/components/main/Footer";
import ContactForm from "@/components/elements/forms/ContactForm";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: 'WhimsyDecor - Home Sweet Hive',
    template: '%s - WhimsyDecor'
  },
  description: 'WhimsyDecor',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await db.user.findFirst({where: {access: 1}, select: {
    userID: true,
    name: true,
    email: true,
    phone: true,
    access: true,
    facebook: true,
    instagram: true,
    pinterest: true,
  }});
  return (
    <main>
      <Nav socialLinks={[user?.facebook as string, user?.instagram as string, user?.pinterest as string]}/>
      {children}
      <Footer socialLinks={[user?.facebook as string, user?.instagram as string, user?.pinterest as string]}/>
      <ContactForm />
    </main>
  );
}
