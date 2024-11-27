import CMSHeader from "@/components/parts/cms/main/CmsHeader";
import LoginCheckServer from "@/components/parts/cms/main/LoginCheckServer";
import CptInvoice from "@/components/parts/cms/pages/billing/CptInvoice";
import StripePayment from "@/components/parts/cms/pages/billing/StripePayment";
import { getSession } from "@/components/scripts/auth/sessionManager";
import { updateUser } from "@/components/scripts/database/queries";
import { Invoice, PrismaClient, User } from "@prisma/client";
const db = new PrismaClient();

export default async function SettingsPage(props: {params: Promise<{id: string}>}) {
  const params = await props.params;
  const sessionUser = await getSession();
  if (!sessionUser) {return(<LoginCheckServer/>)}
  let user : Partial<User> | null = null;
  let invoice : Partial<Invoice> | null = null;
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
    if (params.id && !isNaN(Number(params.id))) invoice = await db.invoice.findUnique({where: {invoiceID: Number(params.id)}})
    if (!user || !invoice || user.userID != invoice.userID) return (<div>404 Error</div>)
  }
  
  return (
    <>
    <CMSHeader page="settings" title="payment" user={user} updateUser={updateUser} invoiceID={invoice?.invoiceID} />
    <div className="cms-wrapper">
      <section>
        <div className="sct-content">
          <div className="sct-header">
            <h4>Billing Invoice</h4>
            <p>Ready to wrap things up? Complete your payment to get your website and domain set up.</p>
          </div>
          <div className="text">
            <CptInvoice invoice={invoice} />
            <StripePayment invoice={invoice!} />
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
