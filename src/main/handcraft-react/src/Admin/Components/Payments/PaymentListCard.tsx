import React from "react";
import PaymentModel from "../../../Models/PaymentModel";
import { Link } from "react-router-dom";

const PaymentListCard: React.FC<{ payments: PaymentModel[] | undefined }> = (
  props
) => {
  return (
    <>
      {props.payments?.map((payment: PaymentModel, index: number) => (
        <div key={index} className="inbox-item">
          <Link to={`/admin/payments:${payment.checkoutId}`}>
            {/* <div className="inbox-item-img">
          </div> */}
            <h5 className="inbox-item-author mt-0 mb-1">
              CheckoutID: {payment.checkoutId}
            </h5>
            <ul className=" mx-3 p-0">
              {payment?.checkoutBill.bill &&
                Object.entries(payment?.checkoutBill.bill).map(
                  ([itemName, count]: [string, number]) => (
                    <li className="d-flex justify-content-between" key={itemName}>
                      <p>{itemName}</p>
                      <span>count: {count}</span>
                    </li>
                  )
                )}
            </ul>
            <h5 className="">
              Total: ${payment.checkoutBill.totalPrice}
            </h5>
            <h6 className="float-end mx-2">{payment.createdAt}</h6>
          </Link>
        </div>
      ))}
    </>
  );
};

export default PaymentListCard;
