import React, { useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import Stripe from "../components/Stripe";
import PayFast from "../components/PayFast";
import PayPal from "../components/PayPal";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const {
    state: { price, items, orderId },
  } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const renderPaymentMethod = () => {
    switch (paymentMethod) {
      case "stripe":
        return <Stripe orderId={orderId} price={price} />;
      case "payfast":
        return <PayFast orderId={orderId} price={price} />;
      case "paypal":
        return <PayPal orderId={orderId} price={price} />;
      case "eft_cash":
        return (
          <div className="w-full px-4 py-8 bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              EFT/Cash Collection Details
            </h3>
            <p className="mb-2">
              <strong>Bank Name:</strong> Example Bank
            </p>
            <p className="mb-2">
              <strong>Account Name:</strong> Your Company Name
            </p>
            <p className="mb-2">
              <strong>Account Number:</strong> 1234567890
            </p>
            <p className="mb-2">
              <strong>Branch Code:</strong> 012345
            </p>
            <p className="mb-4">
              <strong>Reference:</strong> Order ID: {orderId}
            </p>
            <p className="text-sm text-gray-600">
              Please use your Order ID as the payment reference. Your order will
              be shipped once the funds have cleared in our account.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Headers />
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4">
          <div className="flex flex-wrap md:flex-col-reverse">
            <div className="w-7/12 md:w-full">
              <div className="pr-2 md:pr-0">
                <div className="flex flex-wrap">
                  <PaymentOption
                    name="stripe"
                    image="stripe.png"
                    active={paymentMethod === "stripe"}
                    onClick={() => setPaymentMethod("stripe")}
                  />
                  <PaymentOption
                    name="payfast"
                    image="payfast.png"
                    active={paymentMethod === "payfast"}
                    onClick={() => setPaymentMethod("payfast")}
                  />
                  <PaymentOption
                    name="paypal"
                    image="paypal.png"
                    active={paymentMethod === "paypal"}
                    onClick={() => setPaymentMethod("paypal")}
                  />
                  <PaymentOption
                    name="EFT/Cash"
                    image="cash.png"
                    active={paymentMethod === "eft_cash"}
                    onClick={() => setPaymentMethod("eft_cash")}
                  />
                </div>
                {renderPaymentMethod()}
              </div>
            </div>
            <div className="w-5/12 md:w-full">
              <div className="pl-2 md:pl-0 md:mb-0">
                <div className="bg-white shadow p-5 text-slate-600 flex flex-col gap-3">
                  <h2>Order Summary</h2>
                  <div className="flex justify-between items-center">
                    <span>{items} items and shipping fee included</span>
                    <span>${price}</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Amount</span>
                    <span className="text-lg text-orange-500">${price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const PaymentOption = ({ name, image, active, onClick }) => (
  <div
    onClick={onClick}
    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
      active ? "bg-white" : "bg-slate-100"
    }`}
  >
    <div className="flex flex-col gap-[3px] justify-center items-center">
      <img src={`http://localhost:3000/images/payment/${image}`} alt={name} />
      <span className="text-slate-600">{name}</span>
    </div>
  </div>
);

export default Payment;
