import Button from "@/components/elements/html/Button";
import TextInput from "@/components/elements/html/TextInput";
import ToggleList from "@/components/elements/html/ToggleList";
import CMSHeader from "@/components/parts/cms/main/CmsHeader";
import LoginCheckServer from "@/components/parts/cms/main/LoginCheckServer";
import Invoice from "@/components/parts/cms/pages/billing/Invoice";
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
            <Invoice hasDomainEmailSelector={true} />
            <div>
              <p className="v2 mb">Please choose a domain name:</p>
              <p className="v2"><b>Available Domain Names Include</b></p>
              <ul className="mb bullets flex">
                <li><p className="v2">whimsyhomedecor.com</p></li>
                <li><p className="v2">whimsydecorstl.com</p></li>
                <li><p className="v2">whimsyhomes.com</p></li>
                <li><p className="v2">whimsydecorations.com</p></li>
                <li><p className="v2">whimsydecors.com</p></li>
                <li><p className="v2">mywhimsydecor.com</p></li>
                <li><p className="v2">whimdecor.com</p></li>
                <li><p className="v2">whimdec.com</p></li>
              </ul>
            </div>
            <TextInput id="iptBillingDomainName" placeholder="Preferred Domain"/>
            <ToggleList title="Contact Info" textInputs={[
              {placeHolder: "Primary Email Address", id: "iptBillingEmail", loadText: ''},
              {placeHolder: "Phone Number", id: "iptBillingPhone", loadText: ''},
            ]} />
            <ToggleList title="Billing Address" textInputs={[
              {placeHolder: "Street Address", id: "iptBillingAddress", loadText: ''},
              {placeHolder: "City", id: "iptBillingCity", loadText: ''},
              {placeHolder: "State", id: "iptBillingState", loadText: ''},
              {placeHolder: "Zipcode", id: "iptBillingCity", loadText: ''},
            ]} />
            <Button className="no-margin" icon="none" text="Submit" RedirectTrigger={async (test : number) => {
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
