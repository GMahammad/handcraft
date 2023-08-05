import React, { useEffect, useState } from "react";
import ProductModel from "../../Models/ProductModel";
import Spinner from "../../Utils/Spinner";
import { Link, NavLink } from "react-router-dom";

const SearchItem: React.FC<{
  productId: number;
  product: ProductModel;
  key: number;
  gridView: boolean;
  mobile: boolean;
}> = (props) => {
  const [images, setImages] = useState([]);
  const [httpError, setHttpError] = useState("");
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const url = `http://localhost:8080/api/v1/products/getImages?productId=${props.product.productId}`;
      const responseData = await fetch(url);
      const responseJson = await responseData.json();
      if (!responseData.ok) {
        throw new Error("Something went during fetching images wrong!");
      }
      setImages(responseJson);
      setIsLoadingImage(false);
    };
    fetchImages().catch((err) => {
      setHttpError(err.message);
    });
  }, []);

  if (isLoadingImage) {
    return <Spinner />;
  }
  if (httpError) {
    return <p>{httpError}</p>;
  }

  return (
    <>
      <a
        href={`/detail:${props.product.productId}`}
        className={
          props.gridView
            ? "col-lg-4 col-md-6 text-decoration-none whole-product text-center"
            : "text-decoration-none col-lg-12 whole-product text-center"
        }
      >
        {props.gridView ? <p className="view-detail">View Details</p> : <></>}
        <div
          className={
            props.gridView
              ? "product-wrapper product-box-style my-3"
              : "product-wrapper my-3 single-product-list product-list-right-pr w-100"
          }
        >
          <div className={props.gridView ? "col-lg-12" : "col-12 col-sm-5"}>
            <div className="product-img">
              {props.product.discount !== 0 ? (
                <p className="discount">-{props.product.discount}% </p>
              ) : (
                <></>
              )}
              <img
                className="search-product-image mb-2"
                src={images[0]}
                alt=""
              />
            </div>
          </div>
          <div className={props.gridView ? "col-lg-12" : "col-11 col-sm-6"}>
            <div
              className={
                props.gridView ? "product-content" : "product-content-list"
              }
            >
              <div
                className={
                  !props.gridView
                    ? "d-flex justify-content-between align-items-center"
                    : ""
                }
              >
                <h6>
                  <a href="#">
                    {props.product.productName.length > 30
                      ? `${props.product.productName.slice(0, 30)}...`
                      : props.product.productName}{" "}
                  </a>
                </h6>
                <p className="product-price">
                  {props.product.discount !== 0 ? (
                    <label className="old-price">{props.product.price}$</label>
                  ) : (
                    <></>
                  )}{" "}
                  {props.product.discount === 0
                    ? `${props.product.price}$`
                    : `${props.product.discountedPrice}$`}
                </p>
              </div>
              {!props.gridView ? (
                <div className="product-list-cart">
                  <p className="text-center product-description">
                    <hr />
                    {props.product.productDescription}
                  </p>
                  <div className="add-to-card-list text-center mt-5">
                    <a href="#">Add to cart</a>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </a>
    </>
  );
};

export default SearchItem;
