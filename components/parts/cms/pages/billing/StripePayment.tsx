'use client'
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Public key not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

type props = {
  className?: string;
}

const StripePayment : React.FC<props> = ({className = ''}) => {
  let amount = 100.00;
  return (
    <Elements stripe={stripePromise}
      options={{
        mode: "payment",
        amount: convertToSubcurrency(amount),
        currency: "usd",
      }}
    >
      <StripeCheckout amount={amount}/>
    </Elements>
  )
}

const StripeCheckout = ({amount} : {amount : number}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    fetch("/api/create/payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({amount: convertToSubcurrency(amount)})
    })
    .then(res => res.json())
    .then(data => setClientSecret(data.clientSecret))
  }, [])

  return (
    <form>
      {clientSecret && <PaymentElement/>}
      <button>Pay {process.env.STRIPE_PUBLIC_KEY}</button>
    </form>
  )
}

const convertToSubcurrency = (amount: number, factor = 100) => {
  return Math.round(amount * factor);
}
export default StripePayment