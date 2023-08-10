import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModalPayment from "../../Utils/ModalPayment";
import CheckoutRequest from "../../Models/Requests/CheckoutRequest";
import CheckoutBill from "../../Models/CheckoutBill";
const Checkout = () => {
  const [firstName, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [street, setStreet] = useState("");
  const [aparment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [checkPhone, setCheckPhone] = useState<boolean>();
  const [checkElement, setCheckElement] = useState<boolean>();
  const { cartItems, total } = useSelector((store: any) => store.cart);
  const { userEmail } = useSelector((store: any) => store.auth);

  const bill = cartItems.reduce((acc: any, cartItem: any) => {
    acc[cartItem.item.productName] = cartItem.count;
    return acc;
  }, {});
  console.log(bill);

  console.log(bill);
  const checkoutBill = new CheckoutBill(bill, total);
  const checkout = new CheckoutRequest(
    firstName,
    lastname,
    street,
    aparment,
    city,
    zip,
    userEmail,
    phone,
    checkoutBill
  );

  useEffect(() => {
    const checkPhoneNumber = () => {
      const phoneNumberRegex = /^[\d()+-]*$/;
      if (phone && phoneNumberRegex.test(phone)) {
        setCheckPhone(true);
      } else {
        setCheckPhone(false);
      }
    };
    checkPhoneNumber();
  }, [phone]);
  const proceedPaymentCheck = () => {
    if (
      firstName &&
      lastname &&
      street &&
      aparment &&
      city &&
      zip &&
      phone &&
      checkPhone
    ) {
      setCheckElement(true);
    } else {
      alert("Please Fill All Fields!");
      setCheckElement(false);
    }
  };
  return (
    <>
      <div className="checkout-area my-5">
        <div className="container">
          <div className="row"></div>
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12">
              <div className="checkbox-form">
                <h3>Billing Details</h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="checkout-form-list">
                      <label>
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e: any) => setFirstname(e.target.value)}
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="checkout-form-list">
                      <label>
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e: any) => setLastname(e.target.value)}
                        placeholder=""
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="checkout-form-list">
                      <label>
                        Address <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e: any) => setStreet(e.target.value)}
                        placeholder="Street address"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkout-form-list">
                      <input
                        type="text"
                        onChange={(e: any) => setApartment(e.target.value)}
                        placeholder="Apartment, suite, unit etc. (optional)"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkout-form-list">
                      <label>
                        Town / City <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e: any) => setCity(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="checkout-form-list">
                      <label>
                        Postcode / Zip <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e: any) => setZip(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="checkout-form-list">
                      <label>
                        Phone <span className="required">*</span>
                      </label>
                      <input
                        className={!checkPhone ? "form-control is-invalid" : ""}
                        type="text"
                        onChange={(e: any) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkout-form-list">
                      <label>
                        Email Address <span className="required">*</span>
                      </label>
                      <input value={userEmail} disabled type="email" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-12">
              <div className="your-order">
                <h3>Your order</h3>
                <div className="your-order-table table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th className="product-name">Product</th>
                        <th className="product-total">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item: any) => (
                        <tr className="cart_item">
                          <td className="product-name">
                            {item.item.productName}
                            <strong className="product-quantity">
                              {" "}
                              × {item.count}
                            </strong>
                          </td>
                          <td className="product-total">
                            <span className="amount">
                              $
                              {item.item.discount
                                ? `${item.item.discountedPrice}`
                                : item.item.price}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="order-total">
                        <th>Order Total</th>
                        <td>
                          <strong>
                            <span className="amount">${total}</span>
                          </strong>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="payment-method">
                  <div className="payment-accordion">
                    <div className="panel-group" id="faq">
                      <div className="panel panel-default">
                        <div
                          id="payment-1"
                          className="panel-collapse collapse show"
                          data-bs-parent="#faq"
                        >
                          <div className="panel-body">
                            <p>
                              Make your payment directly into our bank account.
                              Please use your Order ID as the payment reference.
                              Your ord er won’t be shipped until the funds have
                              cleared in our account.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="order-button-payment">
                      {checkElement ? (
                        <ModalPayment checkout={checkout} />
                      ) : (
                        <>
                          {" "}
                          <p className="payment-bill-info">
                            Please, fill all fields in order to continue payment
                          </p>{" "}
                          <button
                            onClick={proceedPaymentCheck}
                            className="btn btn-secondary btn-lg"
                          >
                            Proceed Payment
                          </button>{" "}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
