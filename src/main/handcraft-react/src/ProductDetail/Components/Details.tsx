import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import ProductModel from "../../Models/ProductModel";
import Spinner from "../../Utils/Spinner";
import DescriptionReview from "./DescriptionReview";
import RelatedProduct from "./RelatedProduct";

const Details: React.FC<{ productId: string }> = (props) => {
  const [isLoadingSingleProduct, setIsLoadingSingleProduct] = useState(true);
  const [httpError, setHttpError] = useState("");

  const [product, setProduct] = useState<ProductModel>();
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchProductImages = async () => {
      const url = `http://localhost:8080/api/v1/products/getImages?productId=${props.productId}`;
      const responseData = await fetch(url);
      if (!responseData.ok) {
        throw new Error("Something went wrong during fetching single product!");
      }
      const responseJson = await responseData.json();
      setImages(responseJson);
      setIsLoadingSingleProduct(false);
    };
    fetchProductImages().catch((err: any) => {
      setHttpError(err.message);
    });
  }, []);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      const url = `http://localhost:8080/api/products/${props.productId}`;
      const responseData = await fetch(url);
      if (!responseData.ok) {
        throw new Error("Something went wrong during fetching single product!");
      }
      const responseJson = await responseData.json();
      setProduct(responseJson);
      setIsLoadingSingleProduct(false);
    };
    fetchSingleProduct().catch((err: any) => {
      setHttpError(err.message);
    });
  }, []);

  if (isLoadingSingleProduct) {
    return <Spinner />;
  }
  if (httpError) {
    return <p>{httpError}</p>;
  }

  return (
    <>
      <div className="product-details ptb-100 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-7 col-12">
              <div className="product-details-img-content">
                <div className="product-details-tab mr-35 product-details-tab2">
                  <Carousel
                    width={"80%"}
                    autoFocus={true}
                    showStatus={false}
                    className="easyzoom"
                  >
                    {images.map((image,index) => (
                      <div key = {index}>
                        <img src={image} />
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-5 col-12">
              <div className="product-details-content">
                <h3>{product?.productName}</h3>
                <div className="rating-number">
                  <div className="quick-view-rating">
                    <i className="pe-7s-star red-star"></i>
                    <i className="pe-7s-star red-star"></i>
                    <i className="pe-7s-star"></i>
                    <i className="pe-7s-star"></i>
                    <i className="pe-7s-star"></i>
                  </div>
                  <div className="quick-view-number">
                    <span>2 Ratting (S)</span>
                  </div>
                </div>
                <div className="details-price">
                  <span>${product?.price}</span>
                </div>
                <p>{product?.productDescription}</p>
                <div className="quick-view-select">
                  <div className="select-option-part">
                    <label>Color*</label>
                    <select className="select">
                      <option value="">- Please Select -</option>
                      <option value="">orange</option>
                      <option value="">pink</option>
                      <option value="">yellow</option>
                    </select>
                  </div>
                </div>
                <div className="quickview-plus-minus">
                  <div className="cart-plus-minus">
                    <input
                      type="text"
                      value="02"
                      name="qtybutton"
                      className="cart-plus-minus-box"
                    />
                  </div>
                  <div className="quickview-btn-cart">
                    <a className="btn-hover-black" href="#">
                      add to cart
                    </a>
                  </div>
                  <div className="quickview-btn-wishlist">
                    <a className="btn-hover" href="#">
                      <i className="pe-7s-like"></i>
                    </a>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
      <DescriptionReview productDescription = {product?.productDescription}/>
      <RelatedProduct/>
    </>
  );
};

export default Details;
