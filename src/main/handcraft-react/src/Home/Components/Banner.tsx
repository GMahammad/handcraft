import { useEffect, useState } from "react";
import ProductModel from "../../Models/ProductModel";
import { Link } from "react-router-dom";

const Banner = () => {
  const [httpError, setHttpError] = useState("");
  const [productId, setProductId] = useState<number>();
  const [product, setProduct] = useState<ProductModel>();
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    const fetchHomeElements = async () => {
      const url = "http://localhost:8080/api/homepages/1";
      const request = await fetch(url);
      if (!request.ok) {
        throw new Error("Something went wrong!");
      }
      const requestJson = await request.json();
      setProductId(requestJson.bannerProductId);
    };
    fetchHomeElements().catch((e: any) => setHttpError(e.message));
  }, []);

  useEffect(() => {
    const fetchBannerProduct = async () => {
      if (productId) {
        const url = `http://localhost:8080/api/products/${productId}`;
        const request = await fetch(url);
        if (!request.ok) {
          throw new Error("Something went wrong!");
        }
        const requestJson = await request.json();
        setProduct(requestJson);
      }
    };
    fetchBannerProduct().catch((e: any) => setHttpError(e.message));
  }, [productId]);

  useEffect(() => {
    const fetchProductImage = async () => {
      if (productId) {
        const url = `http://localhost:8080/api/v1/products/getImages?productId=${productId}`;
        const request = await fetch(url);
        if (!request.ok) {
          throw new Error("Something went wrong!");
        }
        const requestJson = await request.json();
        setImage(requestJson);
      }
    };
    fetchProductImage().catch((e: any) => setHttpError(e.message));
  }, [productId]);

  if (httpError) {
    return <p>{httpError}</p>;
  }

  return (
    <>
      <div className="banner-area pt-180 pb-180 mt-5">
        <div className="container">
          <div className="row">
            <div className="ms-auto col-lg-5 col-md-12">
              <div className="offer-img">
                
                <h3 className="mb-4 d-lg-none d-md-none">Offered Product</h3>
                <div className="flip-img">
                <img id="first-img" src={image[0]} alt="" />
                <img id="second-img" src={image[1]} alt="" />

                </div>
                <div className="offer-text">
                  <h3>Discount Product for Summer</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="offer-details-wrapper">
                <h2>{product?.productName}</h2>
                <p>{product?.productDescription}</p>
                <div className="offer-price-btn">
                  <div className="offer-price">
                    <span className="offer-old-price">${product?.price}</span>
                    <span className="offer-new-price">
                      ${product?.discountedPrice}
                    </span>
                  </div>
                  <div className="offer-btn">
                    <Link to={`/detail: ${productId}`}>Shop Now →</Link>
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

export default Banner;
