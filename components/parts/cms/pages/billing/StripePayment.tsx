'use client'
import { CardElement, Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { Invoice } from "@prisma/client";
import { CloseInfoForm, StartInfoForm } from "@/components/scripts/client/popup/InfoHandler";
import { FaLock } from "react-icons/fa";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Public key not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

type props = {
  className?: string;
  invoice?: Partial<Invoice>;
}

const StripePayment : React.FC<props> = ({className = '', invoice = {}}) => {
  let amount = 100.00;
  return (
    <Elements stripe={stripePromise}
      // options={{
      //   mode: "payment",
      //   amount: ConvertToSubcurrency(amount),
      //   currency: "usd",
      // }}
    >
      <StripeCheckout invoice={invoice}/>
    </Elements>
  )
}

const StripeCheckout = ({invoice} : {invoice : Partial<Invoice>}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   fetch("/api/create-payment-intent", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({amount: invoice.total})
  //   })
  //   .then(res => res.json())
  //   .then(data => setClientSecret(data.ClientSecret))
  // }, [invoice.total])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    StartInfoForm({title: "Loading...", desc: ""}, false)

    if (!stripe || !elements) {
      CloseInfoForm();
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("Card element not found!");
      CloseInfoForm();
      return;
    }

    // Step 1: Create a payment method with the card info
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message || 'Error creating payment method.');
      CloseInfoForm();
      return;
    }

    // Step 2: Send payment method and email to your backend to create the subscription
    const res = await fetch('/api/stripe/create-subscription', {
      method: 'POST',
      body: JSON.stringify({
        invoiceID: invoice.invoiceID, // Use the email provided by the customer
        paymentMethodID: paymentMethod.id,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (res.status !== 200) {
      setErrorMessage(data.error || 'Something went wrong while creating the subscription.');
      CloseInfoForm();
      return;
    }

    const { subscriptionID, clientSecret } = data;

    // Step 3: Confirm the payment using the client secret
    const { error: confirmError } = await stripe.confirmCardPayment(clientSecret);

    if (confirmError) {
      setErrorMessage(confirmError.message || 'Error confirming payment.');
      CloseInfoForm();
      return;
    }
    console.log("success")

    // Payment succeeded, subscription created
    await router.push(`/dashboard/settings/billing/success`);
    CloseInfoForm();
  };


  return (
    <form className="StripeCheckout mt" onSubmit={handleSubmit}>
      <p className="v2"><FaLock /> <b> Secure Checkout Using Stripe</b></p>
      <p className="v2">Enter your payment details</p>
      <div className="stripeCard">
        <CardElement/>
      </div>
      <p className="v2 error">{errorMessage}</p>

      <button type="submit" className="mt">Complete Payment</button>


    </form>
  )
}

export default StripePayment