import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import { useState, useEffect } from "react";
import usePrivateClient from "../../../hooks/usePrivateClient";
import { useParams } from "react-router-dom";
import useMembershipPkg from "../../../hooks/useMembershipPkg";
import useProfile from "../../../hooks/useProfile";
import Package from "../../../components/Package";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const privateClient = usePrivateClient();
  const [, findPkg] = useMembershipPkg();
  const { pkgName } = useParams();
  const pkg = findPkg(pkgName);
  const profile = useProfile();

  useEffect(() => {
    !clientSecret &&
      privateClient
        .post("/create-payment-intent", { price: pkg.price * 100 })
        .then(({ data }) => setClientSecret(data.clientSecret));
  }, [privateClient, pkg, clientSecret]);

  return (
    <div className="lg:p-6 lg:my-10 my-1 rounded-lg pt-6 px-2 pb-2 lg:mx-0 bg-gradient-to-bl from-green-50 dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500">
      <h2 className="text-2xl lg:mt-10 lg:mb-20 lg:text-5xl font-semibold text-center mb-6">
        Payment
      </h2>
      <div className="flex flex-col md:flex-row flex-wrap gap-4">
        <Package pkg={pkg} />
        <div className="flex-1">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              clientSecret={clientSecret}
              pkg={pkg}
              profile={profile}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
