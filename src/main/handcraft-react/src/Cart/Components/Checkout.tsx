import React from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const { cartItems, total } = useSelector((store: any) => store.cart);

  return (
    <>
      <div className="checkout-area ptb-100">
        <div className="container">
          <div className="row"></div>
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12">
              <form action="#">
                <div className="checkbox-form">
                  <h3>Billing Details</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <label>
                          First Name <span className="required">*</span>
                        </label>
                        <input type="text" placeholder="" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <label>
                          Last Name <span className="required">*</span>
                        </label>
                        <input type="text" placeholder="" />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <label>
                          Address <span className="required">*</span>
                        </label>
                        <input type="text" placeholder="Street address" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <input
                          type="text"
                          placeholder="Apartment, suite, unit etc. (optional)"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <label>
                          Town / City <span className="required">*</span>
                        </label>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <label>
                          State / County <span className="required">*</span>
                        </label>
                        <input type="text" placeholder="" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <label>
                          Postcode / Zip <span className="required">*</span>
                        </label>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <label>
                          Email Address <span className="required">*</span>
                        </label>
                        <input type="email" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <label>
                          Phone <span className="required">*</span>
                        </label>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
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
                            <strong className="product-quantity"> × {item.count}</strong>
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
                      <input type="submit" className="order" value="Place order" />
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
