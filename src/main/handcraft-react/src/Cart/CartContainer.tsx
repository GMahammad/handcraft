import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./Components/CartItem";
import { calculateTotals, clearCart } from "./cartSlice";
import { Link } from "react-router-dom";

const CartContainer = () => {
  const { cartItems, total } = useSelector((store: any) => store.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);
  console.log(cartItems);
  return (
    <section className="cart-container">
      <header>
        <h4 className="text-center">Your Cart</h4>
        <hr />
      </header>
      {total === 0 ? (
        <h5 className="text-center"> Your cart is empty</h5>
      ) : (
        <div className="cart-items">
          {cartItems?.map(({ item, count, color }: any,index:number) => (
            <CartItem
              key={index}
              item={item}
              count={count}
              color={color}
            />
          ))}
        </div>
      )}

      <footer>
        <hr />
        <div className="d-flex justify-content-around align-items-center">
          <h5 className="">
            Total $<span>{total}</span>
          </h5>
          <button
            onClick={() => dispatch(clearCart())}
            className="clear-cart-btn"
          >
            Clear Cart
          </button>
        </div>
        {total ? 
        <div className=" mx-4 my-4 text-center to-cart" >
          <Link  to="/cartpage">
            CartPage
          </Link>
        </div>
        : <></> 
        }
      </footer>
    </section>
  );
};

export default CartContainer;
