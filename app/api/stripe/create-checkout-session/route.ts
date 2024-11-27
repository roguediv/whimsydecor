import { getSession } from "@/components/scripts/auth/sessionManager";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const db = new PrismaClient();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const {invoiceID} = await request.json();
    const invoice = await db.invoice.findUnique({where: {invoiceID: invoiceID}})
    if (!invoice) throw Error("Invoice not found");

    /// Ensure the session is valid and store the user
    const sessionUser = await getSession();
    if (!sessionUser.user) throw Error("Logged Out");
    // if (!sessionUser.user.access || sessionUser.user.access < 1) throw Error("Bad Privileges");
    if (sessionUser.user.userID != invoice.userID) throw Error("Bad Privileges");


    const price = await stripe.prices.create({
      unit_amount: invoice.monthly,
      currency: 'usd',
      recurring: {
        interval: 'month', 
      },
      product_data: {
        name: `Web Hosting Fee for Invoice: ${invoice.invoiceID}`,
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{price: price.id, quantity: 1}],
      mode: "subscription",
      success_url: `/dashboard/billing/success/${invoice.invoiceID}`,
      cancel_url: `/dashboard/billing?useLastInvoice=${invoice.invoiceID}`
    })

    let email = invoice.email;
    let customer = await stripe.customers.list({email, limit: 1});
    if (customer.data.length != 1) {
      customer = await stripe.customers.create({
        email,
      });
    }

    return NextResponse.json({sessionID: session.id})
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      {error: `Internal Server Error: ${error}`},
      {status: 500}
    )
  }

}