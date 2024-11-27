import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();

  const reqText = await req.text();
  return webhooksHandler(reqText, req);
}

async function getCustomerEmail(customerId: string): Promise<string | null> {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return (customer as Stripe.Customer).email;
  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
}

async function handleSubscriptionEvent(
  event: Stripe.Event,
  type: "created" | "updated" | "deleted",
) {
  const subscription = event.data.object as Stripe.Subscription;
  const customerEmail = await getCustomerEmail(subscription.customer as string);

  if (!customerEmail) {
    return NextResponse.json({
      status: 500,
      error: "Customer email could not be fetched",
    });
  }

  const subscriptionData: any = {
    subscription_id: subscription.id,
    stripe_user_id: subscription.customer,
    status: subscription.status,
    start_date: new Date(subscription.created * 1000).toISOString(),
    plan_id: subscription.items.data[0]?.price.id,
    user_id: subscription.metadata?.userId || "",
    email: customerEmail,
  };

  let data, error;
  if (type === "deleted") {

  } else {

  }

  if (error) {
    console.error(`Error during subscription ${type}:`, error);
    return NextResponse.json({
      status: 500,
      error: `Error during subscription ${type}`,
    });
  }

  return NextResponse.json({
    status: 200,
    message: `Subscription ${type} success`,
    data,
  });
}

async function handleInvoiceEvent(
  event: Stripe.Event,
  status: "succeeded" | "failed",
) {
  const invoice = event.data.object as Stripe.Invoice;
  const customerEmail = await getCustomerEmail(invoice.customer as string);

  if (!customerEmail) {
    return NextResponse.json({
      status: 500,
      error: "Customer email could not be fetched",
    });
  }

  const invoiceData = {
    invoice_id: invoice.id,
    subscription_id: invoice.subscription as string,
    amount_paid: status === "succeeded" ? invoice.amount_paid / 100 : undefined,
    amount_due: status === "failed" ? invoice.amount_due / 100 : undefined,
    currency: invoice.currency,
    status,
    user_id: invoice.metadata?.userId,
    email: customerEmail,
  };


  return NextResponse.json({
    status: 200,
    message: `Invoice payment ${status}`,
    invoiceData,
  });
}

async function handleCheckoutSessionCompleted(
  event: Stripe.Event,
) {
  const session = event.data.object as Stripe.Checkout.Session;
  const metadata: any = session?.metadata;

  if (metadata?.subscription === "true") {
    // This is for subscription payments
    const subscriptionId = session.subscription;
    try {
      await stripe.subscriptions.update(subscriptionId as string, { metadata });

      return NextResponse.json({
        status: 200,
        message: "Subscription metadata updated successfully",
      });
    } catch (error) {
      console.error("Error updating subscription metadata:", error);
      return NextResponse.json({
        status: 500,
        error: "Error updating subscription metadata",
      });
    }
  } else {
    // This is for one-time payments
    const dateTime = new Date(session.created * 1000).toISOString();
    try {
      const paymentData = {
        user_id: metadata?.userId,
        stripe_id: session.id,
        email: metadata?.email,
        amount: session.amount_total! / 100,
        customer_details: JSON.stringify(session.customer_details),
        payment_intent: session.payment_intent,
        payment_time: dateTime,
        currency: session.currency,
      };

      return NextResponse.json({
        status: 200,
        message: "Payment and credits updated successfully",
      });
    } catch (error) {
      console.error("Error handling checkout session:", error);
      return NextResponse.json({
        status: 500,
        error,
      });
    }
  }
}

async function webhooksHandler(
  reqText: string,
  request: NextRequest,
): Promise<NextResponse> {
  const sig = request.headers.get("Stripe-Signature");

  try {
    const event = await stripe.webhooks.constructEventAsync(
      reqText,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "customer.subscription.created":
        return handleSubscriptionEvent(event, "created");
      case "customer.subscription.updated":
        return handleSubscriptionEvent(event, "updated");
      case "customer.subscription.deleted":
        return handleSubscriptionEvent(event, "deleted");
      case "invoice.payment_succeeded":
        return handleInvoiceEvent(event, "succeeded");
      case "invoice.payment_failed":
        return handleInvoiceEvent(event, "failed");
      case "checkout.session.completed":
        return handleCheckoutSessionCompleted(event);
      default:
        return NextResponse.json({
          status: 400,
          error: "Unhandled event type",
        });
    }
  } catch (err) {
    console.error("Error constructing Stripe event:", err);
    return NextResponse.json({
      status: 500,
      error: "Webhook Error: Invalid Signature",
    });
  }
}