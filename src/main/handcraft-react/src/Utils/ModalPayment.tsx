import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon, Modal } from "semantic-ui-react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CheckoutRequest from "../Models/Requests/CheckoutRequest";
import PaymentInfoRequest from "../Models/Requests/PaymentInfoRequest";
import { Redirect, useHistory } from "react-router-dom";
import Spinner from "./Spinner";
import { clearCart } from "../Cart/cartSlice";

const ModalPayment: React.FC<{ checkout: CheckoutRequest }> = (props) => {
  const [open, setOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [httpError, setHttpError] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const { accessToken, tokenType } = useSelector((store: any) => store.auth);

  const dispatch = useDispatch();
  const elements = useElements();
  const stripe = useStripe();
  const history = useHistory();

  const redirectToAnotherLink = () => {
    history.push("/paymentcompleted");
  };
  const checkout = async () => {
    if (!stripe || !elements || !elements.getElement(CardElement)) {
      return;
    }

    setSubmitDisabled(true);
    setPaymentLoading(true);
    let paymentInfo = new PaymentInfoRequest("USD", props.checkout);

    const url = `http://localhost:8080/api/v1/checkout/payment-intent`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentInfo),
    };
    const stripeResponse = await fetch(url, requestOptions);
    if (!stripeResponse.ok) {
      setHttpError(true);
      setSubmitDisabled(false);
      throw new Error("Something went wrong!");
    }
    const stripeResponseJson = await stripeResponse.json();
    const stripeSecret = JSON.parse(stripeResponseJson.paymentIntent);
    const checkoutId = stripeResponseJson.checkoutId;
    stripe
      .confirmCardPayment(
        stripeSecret.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              email: props.checkout.email,
            },
          },
        },

        { handleActions: false }
      )
      .then(async function (result: any) {
        if (result.error) {
          setSubmitDisabled(false);
          alert("There was an error");
        } else {
          const url = `http://localhost:8080/api/v1/checkout/payment-complete?checkoutId=${checkoutId}%20`;
          const requestOptions = {
            method: "PUT",
            headers: {
              Authorization: `${tokenType} ${accessToken}`,
              "Content-Type": "application/json",
            },
          };
          const stripeResponse = await fetch(url, requestOptions);
          if (!stripeResponse.ok) {
            setHttpError(true);
            setSubmitDisabled(false);
            throw new Error("Something went wrong!");
          }
          setPaymentLoading(false);
          redirectToAnotherLink();
          dispatch(clearCart())
          setSubmitDisabled(false);
        }
      });
    setHttpError(false);
  };

  return (
    <Modal
      style={{ height: "200px", top: "40%" }}
      size="tiny"
      closeIcon
      open={open}
      trigger={
        <button className="btn btn-lg btn-secondary">Proceed Payment</button>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Content style={{ textAlign: "center", fontSize: "18px" }}>
        <p>Please fill all fields!</p>
      </Modal.Content>
      <div className="container">
        <CardElement></CardElement>
        <div className="px-3">{paymentLoading && <Spinner />}</div>
      </div>

      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button onClick={checkout} disabled={submitDisabled} color="green">
          <Icon name="checkmark" /> Add
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalPayment;
