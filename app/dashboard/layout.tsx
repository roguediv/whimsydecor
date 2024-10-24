import InfoForm from "@/components/elements/forms/InfoForm";
import CMSNav from "@/components/parts/cms/main/CmsNav";
import LoginCheck from "@/components/parts/cms/main/LoginCheck";
import { isValidSession } from "@/components/scripts/auth/sessionManager";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: 'WhimsyDecor - Admin',
    template: '%s - WhimsyDecor'
  },
  description: 'WhimsyDecor',
}

export default function CMSLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="cms dashboard">
      <LoginCheck trigger={isValidSession} />
      <CMSNav />
      {children}
      <InfoForm/>
    </main>
  )
}
