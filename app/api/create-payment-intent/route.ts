import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const {amount} = await request.json();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currenct: "usd",
      automatic_payment_methods: {enabled: true},
    })
    return NextResponse.json({ClientSecret: paymentIntent.client_secret})
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      {error: `nternal Server Error: ${error}`},
      {status: 500}
    )
  }

}