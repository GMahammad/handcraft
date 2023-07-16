import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import ProductModel from "../../Models/ProductModel";
import CategoryModel from "../../Models/CategoryModel";

import Spinner from "../../Utils/Spinner";
import DescriptionReview from "./DescriptionReview";
import RelatedProduct from "./RelatedProduct";
import React from "react";
import StarRating from "../../Utils/StarRating";
import ColorModel from "../../Models/ColorModel";

const Details: React.FC<{ productId: string }> = (props) => {
  const [isLoadingSingleProduct, setIsLoadingSingleProduct] = useState(true);
  const [httpError, setHttpError] = useState("");

  const [colors,setColors] = useState<ColorModel[]>([]) 
  const [relatedProducts, setRelatedProducts] = useState<ProductModel[]>([]);
  const [product, setProduct] = useState<ProductModel>();
  const [category, setCategory] = useState<CategoryModel>();
  const [categoryId, setCategoryId] = useState(0);
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

  useEffect(() => {
    const fetchCategoryName = async () => {
      const url = `http://localhost:8080/api/products/${props.productId}/category`;
      const responseData = await fetch(url);
      if (!responseData.ok) {
        throw new Error("Something went wrong!");
      }
      const responseJson = await responseData.json();
      setCategory(responseJson);
      setCategoryId(responseJson.categoryId);
    };
    fetchCategoryName().catch((err) => {
      setHttpError(err.message);
    });
  }, []);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      const url = `http://localhost:8080/api/products/search/findByCategoryAndProductIdNot?category=${categoryId}%20&productId=${props.productId}%20&page=0&size=4`;
      console.log(url);
      const responseData = await fetch(url);
      if (!responseData.ok) {
        throw new Error("Something went wrong!");
      }
      const responseJson = await responseData.json();
      setRelatedProducts(responseJson._embedded.products);
    };
    fetchRelatedProducts().catch((err) => setHttpError(err.message));
  }, [categoryId]);

  useEffect(()=>{
    const fetchProductColors = async() =>{
      const url = `http://localhost:8080/api/products/search/findColorsByProductId?productId=${props.productId}`
      const responseData = await fetch(url);
      if(!responseData.ok){
        throw new Error("Something went wrong while fetching colors!")
      }
      const responseJson = await responseData.json();
      setColors(responseJson._embedded.colors)
    }
    fetchProductColors().catch((err:any) => setHttpError(err.message))
  },[])

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
            <h3 className="single-product-details">Product Details</h3>
            <hr />
            <div className="col-md-12 col-lg-6 col-12">
              <div className="product-details-img-content">
                <div className="product-details-tab mr-35 product-details-tab2">
                  <Carousel
                    showStatus={false}
                    interval={4000}
                    autoPlay={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    width={"85%"}
                    autoFocus={true}
                    className="easyzoom"
                  >
                    {images.map((image, index) => (
                      <div key={index}>
                        <img src={image} />
                        <p className="discount">-{product?.discount}% </p>
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 col-12">
              <div className="product-details-content">
                <div className="category-name-details">
                  <span>Category: {category?.categoryName}</span>
                </div>
                <div className="product-head d-flex justify-content-between align-items-center">
                  <div className="mb-4">
                    <h3>{product?.productName}</h3>
                  </div>
                  <div className="details-price mt-3">
                    <p className="product-price">
                      {product?.discount !== 0 ? (
                        <label className="old-price">{product?.price}$</label>
                      ) : (
                        <></>
                      )}
                      {product?.discountedPrice}$
                    </p>
                  </div>
                </div>
                <div className="rating-number">
                  <div className="quick-view-rating ">
                    <StarRating rating={product?.rating} size={20} />
                  </div>
                </div>

                <hr />
                <div>
                  <p>{product?.productDescription}</p>
                </div>
                <hr />
                <div className="select-option-part d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <label>Colors: </label>
                    <select className="select mx-2 color-select">
                      <option>--Please Select--</option>
                      {colors.map((color,index)=>(
                        <option key={index} value="">{color.colorName.charAt(0).toUpperCase() + color.colorName.slice(1,color.colorName.length) }</option>
                      ))}
                    </select>
                  </div>
                  <div className="quickview-btn-cart d-flex align-items-center">
                    <div className="cart-count">
                      <label>Count: </label>
                      <input
                        type="number"
                        min="0"
                        name="qtybutton"
                        placeholder="0"
                        className="cart-plus-minus-box"
                      />
                    </div>
                  </div>
                </div>
                <div className="quickview-plus-minus text-center w-100">
                  <div className="add-to-card-list text-center w-100">
                    <button className="w-100">Add to Cart</button>
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
          <hr />
        </div>
      </div>
      <DescriptionReview productDescription={product?.productDescription} />
      <RelatedProduct relatedProducts={relatedProducts} />
    </>
  );
};

export default Details;
