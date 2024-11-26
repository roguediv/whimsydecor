'use client'
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"

const stripePromise = loadStripe("pk_live_51OcINRBcLiyGZFFz1xvrIAhdEVY3d5ad3tokuVaiGIXsF8SJGx5yVidb3wGpFmFwVvyHAVVW6Pnq")

type props = {
  className?: string;
}

const StripePayment : React.FC<props> = ({className = ''}) => {

  return (
    <Elements stripe={stripePromise}>
      <StripeCheckout/>
    </Elements>
  )
}

const StripeCheckout : React.FC<props> = ({className = ''}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create/payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({amount: convertToSubcurrency(100.00)})
    })
    .then(res => res.json())
    .then(data => setClientSecret(data.clientSecret))
  }, [])

  return (
    <form>
      {clientSecret && <PaymentElement/>}
      <button>Pay</button>
    </form>
  )
}

const convertToSubcurrency = (amount: number, factor = 100) => {
  return Math.round(amount * factor);
}
export default StripePayment