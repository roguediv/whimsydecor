import Button from "@/components/elements/html/Button";
import TextInput from "@/components/elements/html/TextInput";
import ToggleList from "@/components/elements/html/ToggleList";
import CMSHeader from "@/components/parts/cms/main/CmsHeader";
import LoginCheckServer from "@/components/parts/cms/main/LoginCheckServer";
import Invoice from "@/components/parts/cms/pages/billing/Invoice";
import StripePayment from "@/components/parts/cms/pages/billing/StripePayment";
import { getSession, logout } from "@/components/scripts/auth/sessionManager";
import { updateUser } from "@/components/scripts/database/queries";
import { PrismaClient, User } from "@prisma/client";
import Link from "next/link";
const db = new PrismaClient();

export default async function SettingsPage() {
  const sessionUser = await getSession();
  if (!sessionUser) {return(<LoginCheckServer/>)}
  let user : Partial<User> | null = null;
  if (sessionUser.user) {
    user = await db.user.findUnique({where: {userID: sessionUser.user.userID}, select: {
      userID: true,
      name: true,
      email: true,
      phone: true,
      access: true,
      facebook: true,
      instagram: true,
      pinterest: true,
    }});
  }
  
  return (
    <>
    <CMSHeader page="settings" user={user} updateUser={updateUser} />
    <div className="cms-wrapper">
      <section>
        <div className="sct-content">
          <div className="sct-header">
            <h4>Billing</h4>
            <p>To make this website live, you'll need to select a domain name, choose the professional emails you'd like to associate with your domain, and provide your billing information. Please complete the following fields to finalize the setup of your website.</p>
          </div>
          <div className="text">
            <Invoice />
            <StripePayment />
            <Button className="no-margin" icon="none" text="Back" RedirectTrigger={async (test : number) => {
              "use server"
              if (test === 0) return {status: 1, title: '', desc: '', data: '1'};
              await logout();
              return {status: 1, title: '', desc: '', data: '/admin'}
            }} />
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
