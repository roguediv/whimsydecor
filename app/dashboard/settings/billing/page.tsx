import Button from "@/components/elements/html/Button";
import TextInput from "@/components/elements/html/TextInput";
import ToggleList from "@/components/elements/html/ToggleList";
import CMSHeader from "@/components/parts/cms/main/CmsHeader";
import LoginCheckServer from "@/components/parts/cms/main/LoginCheckServer";
import CptInvoice from "@/components/parts/cms/pages/billing/CptInvoice";
import SubmitInvoiceButton from "@/components/parts/cms/pages/billing/SubmitInvoiceButton";
import { getSession, logout } from "@/components/scripts/auth/sessionManager";
import { CreateInvoice } from "@/components/scripts/database/CreateInvoice";
import { updateUser } from "@/components/scripts/database/queries";
import { Invoice, PrismaClient, User } from "@prisma/client";
const db = new PrismaClient();

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const useLastInvoice = params.useLastInvoice;

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

  let lastInvoice: Invoice | null = null;
  if (useLastInvoice && user && !isNaN(Number(useLastInvoice))) {
    lastInvoice = await db.invoice.findUnique({where: {userID: user.userID, invoiceID: Number(useLastInvoice)}})
  }
  
  return (
    <>
    <CMSHeader page="settings" title="billing" user={user} updateUser={updateUser} />
    <div className="cms-wrapper">
      <section>
        <div className="sct-content">
          <div className="sct-header">
            <h4>Website Setup Invoice</h4>
            <p>To make this website live, you'll need to select a domain name, choose the professional emails you'd like to associate with your domain, and provide your billing information. Please complete the following fields to finalize the setup of your website.</p>
          </div>
          <div className="text">
            <CptInvoice hasDomainEmailSelector={true} invoice={lastInvoice} />
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
            <TextInput id="iptBillingDomainName" placeholder="Preferred Domain" loadText={useLastInvoice ? `${lastInvoice?.domain}` : ""}/>
            <ToggleList title="Contact Info" textInputs={[
              {placeHolder: "First Name", id: "iptBillingFName", loadText: `${useLastInvoice ? `${lastInvoice?.fName}` : ""}`},
              {placeHolder: "Last Name", id: "iptBillingLName", loadText: `${useLastInvoice ? `${lastInvoice?.lName}` : ""}`},
              {placeHolder: "Primary Email Address", id: "iptBillingEmail", loadText: `${useLastInvoice ? `${lastInvoice?.email}` : ""}`},
              {placeHolder: "Phone Number", id: "iptBillingPhone", loadText: `${useLastInvoice ? `${lastInvoice?.phone}` : ""}`},
            ]} />
            <ToggleList title="Billing Address" textInputs={[
              {placeHolder: "Street Address", id: "iptBillingAddress", loadText: `${useLastInvoice ? `${lastInvoice?.address}` : ""}`},
              {placeHolder: "City", id: "iptBillingCity", loadText: `${useLastInvoice ? `${lastInvoice?.city}` : ""}`},
              {placeHolder: "State", id: "iptBillingState", loadText: `${useLastInvoice ? `${lastInvoice?.state}` : ""}`},
              {placeHolder: "Zipcode", id: "iptBillingZipcode", loadText: `${useLastInvoice ? `${lastInvoice?.zipcode}` : ""}`},
            ]} />
            <SubmitInvoiceButton SubmitInvoice={CreateInvoice} />
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
