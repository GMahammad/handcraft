import React, { useEffect, useState } from "react";
import PaymentModel from "../../../Models/PaymentModel";
import { useLocation } from "react-router-dom";
import { Card, Input, Label, Message, Select } from "semantic-ui-react";

const SinglePayment = () => {
  const [payment, setPayment] = useState<PaymentModel>();
  const [httpError, setHttpError] = useState("");
  const location = useLocation();
  const checkoutId = location.pathname.split(":")[1];
  useEffect(() => {
    const fetchSinglePayment = async () => {
      const url = `http://localhost:8080/api/checkouts/${checkoutId}`;
      const request = await fetch(url);
      if (!request.ok) {
        throw new Error("Something went wrong!");
      }
      const requestJson = await request.json();
      console.log(requestJson);
      setPayment(requestJson);
    };
    fetchSinglePayment().catch((e: any) => setHttpError(e.message));
  }, []);
  return (
    <div className="content-page">
      <h2 className="text-center">Checkout ID: {checkoutId}</h2>
      <Card fluid>
        <Card.Content>
          <div className="row">
            <div className="col-2">
              <Label>Customer First Name</Label> <br />
              <h3 className="mx-1">{payment?.firstName}</h3>
            </div>
            <div className="col-2">
              <Label>Customer Last Name</Label> <br />
              <h3>{payment?.lastName}</h3>
            </div>
            <div className="col-4">
              <Label>Customer City</Label> <br />
              <h3>{payment?.email}</h3>
            </div>
            <div className="col-2">
              <Label>Customer City</Label> <br />
              <h3>{payment?.city}</h3>
            </div>
            <div className="col-2 pb-3">
              <Label>Customer ZipCode</Label> <br />
              <h3>{payment?.zipCode}</h3>
            </div>
            <hr />
            <div className="col-2">
              <Label>Customer Phone</Label> <br />
              <h3>{payment?.phone}</h3>
            </div>
            <div className="col-2">
              <Label>Customer Street</Label> <br />
              <h3>{payment?.streetAddress}</h3>
            </div>
            <div className="col-3">
              <Label>Customer Apartment</Label> <br />
              <h3 className="pb-3">{payment?.apartmentAddress}</h3>
            </div>
            <div className="col-2 ">
              <Label>Checkout Created at</Label> <br />
              <h3 className="">
                {" "}
                {payment?.createdAt ? payment.createdAt.toString() : "N/A"}
              </h3>
            </div>
            <div className="col-2 ">
              <Label>Checkout Status</Label> <br />
              <select className="mt-1" value={payment?.checkEnum}>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>
            <hr />
            <div className="col-4 text-center">
              <Label className="">Checkout Bill</Label> <br />
              <ul className="checkout-bill">
                {payment?.checkoutBill.bill &&
                  Object.entries(payment?.checkoutBill.bill).map(
                    ([itemName, count]: [string, number]) => (
                      <li key={itemName}>
                        <p>{itemName}</p>
                        <span>count: {count}</span>
                      </li>
                    )
                  )}
              </ul>
            </div>
            <div className="col-2 text-center">
              <Label>Checkout Total Price</Label> <br />
              <h3 style={{ fontSize: "18px" }} className="badge bg-success ">
                ${payment?.checkoutBill.totalPrice}
              </h3>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default SinglePayment;
