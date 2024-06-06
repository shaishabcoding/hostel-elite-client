import { useStripe } from "@stripe/react-stripe-js";
import { useElements } from "@stripe/react-stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import usePrivateClient from "../../../../hooks/usePrivateClient";
import useMembershipPkg from "../../../../hooks/useMembershipPkg";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loading from "../../../../components/Loading";

const CheckoutForm = ({ clientSecret, pkg, profile }) => {
  const [profileUser, refetch] = profile;
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [, findPkg] = useMembershipPkg();
  const privateClient = usePrivateClient();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirmError");
    } else {
      if (paymentIntent.status === "succeeded") {
        console.log(paymentIntent.id);

        const payment = {
          email: user.email,
          price: pkg.price,
          date: new Date(),
          badge: pkg.name,
          paymentId: paymentIntent.id,
        };

        const res = await privateClient.post("/payments", payment);
        if (res.data.result.insertedId) {
          refetch();
          Swal.fire({
            title: "Success",
            text: "Payment successfully!",
            icon: "success",
            confirmButtonText: "Done",
          });
        }
      }
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto p-2 md:p-4 dark:bg-white/90 rounded-lg h-full flex items-center justify-center"
    >
      <div className="w-full">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={
            !stripe || !clientSecret || findPkg(profileUser?.badge) || loading
          }
        >
          {loading ? <Loading className="my-0 text-primary" /> : <>Pay</>}
        </button>
        <p className="text-error">{error}</p>
        {findPkg(profileUser?.badge) && (
          <p className="mt-4 flex gap-1">
            You are already
            <Link to={`/checkout/${profileUser?.badge}`} className="link">
              {profileUser?.badge}
            </Link>
            user
          </p>
        )}
      </div>
    </form>
  );
};

export default CheckoutForm;
