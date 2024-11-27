import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/components/scripts/auth/sessionManager";
const db = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { invoiceID, paymentMethodID } = await request.json();
    const invoice = await db.invoice.findUnique({ where: { invoiceID } });
    if (!invoice) throw Error("Invoice not found");

    // Ensure the session is valid and store the user
    const sessionUser = await getSession();
    if (!sessionUser.user) throw Error("Logged Out");
    if (sessionUser.user.userID !== invoice.userID) throw Error("Bad Privileges");

    const email = invoice.email;
    let customer = await stripe.customers.list({ email, limit: 1 });

    if (customer.data.length === 0) {
      // No customer found, create a new one
      customer = await stripe.customers.create({ email });
      console.log("Created new customer:", customer);
    } else {
      // Use the existing customer
      customer = customer.data[0];
    }

    if (!customer.id) {
      throw new Error("Failed to create or find a customer");
    }

    // Step 1: Attach the payment method to the customer (if not already attached)
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodID);

    // If the payment method isn't attached to the customer yet, attach it
    if (paymentMethod.customer !== customer.id) {
      await stripe.paymentMethods.attach(paymentMethodID, {
        customer: customer.id,
      });
    }

    // Step 2: Update the customer's default payment method
    await stripe.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethodID,
      },
    });

    const initialPaymentIntent = await stripe.paymentIntents.create({
      amount: invoice.total,  // The one-time setup fee
      currency: 'usd',
      customer: customer.id,
      payment_method: paymentMethodID, // Use the payment method provided by the user
      off_session: true, // Payment is made off-session, i.e., without further user interaction
      confirm: true, // Automatically confirm the payment
      description: 'Website Domain and Server Setup Fee',
    });

    const price = await stripe.prices.create({
      unit_amount: invoice.monthly,
      currency: 'usd',
      recurring: { interval: 'month' },
      product_data: {
        name: 'Web Hosting Fee',
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      default_payment_method: paymentMethodID,
      expand: ['latest_invoice.payment_intent'], // Expand the payment intent for the initial payment
    });

    return NextResponse.json({ clientSecret: initialPaymentIntent.client_secret, subscriptionId: subscription.id, });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
