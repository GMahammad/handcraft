import React, { useEffect, useState } from "react";
import ProductModel from "../../Models/ProductModel";
import { useDispatch } from "react-redux";
import { removeItem } from "../cartSlice";

const CartItem: React.FC<{
  key: number;
  item: ProductModel;
  count: number;
  color: string;
}> = (props) => {
  const [httpError, setHttpError] = useState("");
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchImages = async () => {
      const url = `http://localhost:8080/api/v1/products/getImages?productId=${props.item.productId}`;
      const responseData = await fetch(url);
      const responseJson = await responseData.json();
      if (!responseData.ok) {
        throw new Error("Something went during fetching images wrong!");
      }
      setImages(responseJson);
    };
    fetchImages().catch((err) => {
      setHttpError(err.message);
    });
  }, [props.item]);

  if (httpError) {
    return <p>{httpError}</p>;
  }

  return (
    <div className="cart-item d-flex justify-content-between align-items-center my-2">
      <div>
        <img className="cart-img" src={`${images[0]}`} alt="" />
      </div>
      <div className="mx-2">
        <p>
          {props.item.productName.length > 15
            ? `${props.item.productName.slice(0, 15)}...`
            : props.item.productName}
        </p>
        <p>
          {" "}
          {props.item.discount
            ? `${props.item.discountedPrice}`
            : props.item.price}
          $ X {props.count}
        </p>
        <p>Color:{props.color}</p>
      </div>
      <div>
        <button
          onClick={() =>
            dispatch(
              removeItem({
                productId: props.item.productId,
                color: props.color,
                count: props.count,
              })
            )
          }
          className="remove-cart-item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash3-fill"
            viewBox="0 0 16 16"
          >
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
