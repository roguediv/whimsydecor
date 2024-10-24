import InfoForm from "@/components/elements/forms/InfoForm";
import CMSNav from "@/components/parts/cms/main/CmsNav";
import LoginCheck from "@/components/parts/cms/main/LoginCheck";
import { isValidSession } from "@/components/scripts/auth/sessionManager";
import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: 'WhimsyDecor - Admin',
    template: '%s - WhimsyDecor'
  },
  description: 'WhimsyDecor',
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="cms">
      <LoginCheck trigger={isValidSession} toHome={false}/>
      <CMSNav login={true} />
      {children}
      <InfoForm/>
    </main>
  )
}
