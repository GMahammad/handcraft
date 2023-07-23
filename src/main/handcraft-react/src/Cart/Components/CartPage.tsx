import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../cartSlice";
import CartPageItem from "./CartPageItem";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [images, setImages] = useState([]);
  const [httpError, setHttpError] = useState("");
  const [productIdImage , setProductIdImage] = useState([])
  const { cartItems, total,hello } = useSelector((store: any) => store.cart);
  const dispatch = useDispatch();


  return (
    <>
      <div className="cart-main-area pt-95 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <h1 className="cart-heading">Cart</h1>
                <div className="table-content table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>remove</th>
                        <th>images</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item: any) => (
                        <CartPageItem item ={item} />
                      ))}
                    </tbody>
                  </table>
                </div>
                {cartItems.length === 0 ? (
                  <p className="error-message text-center">
                    Your Cart is currently empty
                  </p>
                ) : (
                  <>
                    <hr />
                    <div className="row">
                      <div className="col-md-5 ms-auto">
                        <div className="cart-page-total">
                          <h2>Cart totals</h2>
                          <ul>
                            <li>
                              Total<span>${total}</span>
                            </li>
                          </ul>
                          <Link to='/checkout'>Proceed to checkout</Link>
                        </div>
                      </div>
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
