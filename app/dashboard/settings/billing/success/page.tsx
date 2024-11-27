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

interface PageProps {
  searchParams?: { [key: string]: string | undefined }; // Query params will be here
}

export default async function BillingPage({ searchParams }: PageProps) {
  const params = await searchParams;

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
  const useLastInvoice = params?.useLastInvoice;
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
            <h4>Your Payment was Successful!</h4>
            <p>Thank you for your payment! You will be emailed an invoice for your purchase. Please give us 24-48 hours to complete the setup of your website and domain registration.</p>
          </div>
          <div className="text">
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
