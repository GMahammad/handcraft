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
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Cart/cartSlice";
import ReviewModel from "../../Models/ReviewModel";

const Details: React.FC<{ productId: string }> = (props) => {
  const [isLoadingSingleProduct, setIsLoadingSingleProduct] = useState(true);
  const [httpError, setHttpError] = useState("");

  const [colors, setColors] = useState<ColorModel[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<ProductModel[]>([]);
  const [product, setProduct] = useState<ProductModel>();
  const [category, setCategory] = useState<CategoryModel>();
  const [categoryId, setCategoryId] = useState(0);
  const [images, setImages] = useState([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartColor, setCartColor] = useState("");

  const [leaveReviewToggle, setLeaveReviewToggle] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState(false);
  const [reviewPostError, setReviewPostError] = useState(false);
  const [reviewBody, setReviewBody] = useState("");
  const [reviewRank, setReviewRank] = useState(0);
  const [productRank, setProductRank] = useState(0);
  const [userAddedReview, setUserAddedReview] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [countError, setCountError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reviews, setReviews] = useState<ReviewModel[]>([]);

  const { isAuthenticated, accessToken, tokenType, userEmail } = useSelector(
    (store: any) => store.auth
  );
  const dispatch = useDispatch();

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
      const responseData = await fetch(url);
      if (!responseData.ok) {
        throw new Error("Something went wrong!");
      }
      const responseJson = await responseData.json();
      setRelatedProducts(responseJson._embedded.products);
    };
    fetchRelatedProducts().catch((err) => setHttpError(err.message));
  }, [categoryId]);

  useEffect(() => {
    const fetchProductColors = async () => {
      const url = `http://localhost:8080/api/products/search/findColorsByProductId?productId=${props.productId}`;
      const responseData = await fetch(url);
      if (!responseData.ok) {
        throw new Error("Something went wrong while fetching colors!");
      }
      const responseJson = await responseData.json();
      setColors(responseJson._embedded.colors);
    };
    fetchProductColors().catch((err: any) => setHttpError(err.message));
  }, []);

  useEffect(() => {
    const fetchReviewByProduct = async () => {
      const url = `http://localhost:8080/api/products/${props.productId}/reviews`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      let productRankNumber = 0;

      const responseJson = await response.json();
      setReviews(responseJson._embedded.reviews);
      for (const key in reviews) {
        productRankNumber += reviews[key].ranking;
        if (userEmail === reviews[key].userEmail) {
          setUserAddedReview(true);
        }
      }
      if (reviews) {
        setProductRank(
          Math.round((productRankNumber / reviews.length) * 2) / 2
        );
      }
    };
    fetchReviewByProduct().catch((e: any) => setHttpError(e.message));
  }, [productRank, reviewSuccess]);

  const addItemToCart = () => {
    if (cartColor !== "" && cartCount) {
      dispatch(addToCart({ product, cartCount, cartColor }));
      setColorError(false);
      setCountError(false);
      setSuccess(true); // Show success message
      setTimeout(() => {
        setSuccess(false); // Hide success message after 2 seconds
      }, 2000);
    } else {
      if (!cartColor) {
        setSuccess(false);
        setColorError(true);
      } else {
        setColorError(false);
      }
      if (!cartCount) {
        setCountError(true);
        setSuccess(false);
      } else {
        setCountError(false);
      }
    }
  };

  const addReview = async (event: any) => {
    event.preventDefault();
    try {
      if (reviewBody && reviewRank) {
        const url = "http://localhost:8080/api/v1/reviews/addreview";
        const requestBody = {
          method: "POST",
          headers: {
            Authorization: `${tokenType} ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reviewBody: reviewBody,
            ranking: reviewRank,
            productId: props.productId,
            userEmail: userEmail,
          }),
        };

        const response = await fetch(url, requestBody);

        if (response.ok) {
          setReviewSuccess(true);
          setReviewError(false);
          setUserAddedReview(true);
        } else {
          setReviewError(true);
          throw new Error("Failed to send message");
        }
      } else {
        setReviewPostError(true);
      }
    } catch (error) {
      setReviewPostError(true);
    }
  };

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
                    width={"100%"}
                    autoFocus={true}
                    className="easyzoom"
                  >
                    {images.map((image, index: number) => (
                      <div key={index}>
                        <img src={image} alt="" />
                        {product?.discount ? (
                          <p className="discount">-{product?.discount}% </p>
                        ) : (
                          <></>
                        )}
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
                  <div className="mb-2">
                    <h3>{product?.productName}</h3>
                  </div>
                  <div className="details-price mt-3">
                    <p className="product-price">
                      {product?.discount === 0 ? (
                        <label>{product?.price}</label>
                      ) : (
                        <></>
                      )}
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
                  <div className="quick-view-rating d-flex align-items-center">
                    <StarRating rating={productRank} size={20} />
                    <span className="px-1 pt-1">
                      Rating: ({productRank >= 0 ? productRank : 0})
                    </span>
                  </div>
                </div>

                <hr />
                <div>
                  <p>{product?.productDescription}</p>
                </div>
                <hr />
                {success ? (
                  <h6 className="success-message">
                    Product added successfully to your cart!
                  </h6>
                ) : (
                  <></>
                )}
                {colorError ? (
                  <h6 className="error-message">
                    Please select the color of product!
                  </h6>
                ) : (
                  <></>
                )}
                {countError ? (
                  <h6 className="error-message">
                    Please select the count of product!
                  </h6>
                ) : (
                  <></>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addItemToCart();
                  }}
                >
                  <div className="select-option-part d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <label>Colors: </label>
                      <select
                        
                        onChange={(e) => setCartColor(e.target.value)}
                        className="select mx-2 color-select"
                      >
                        <option disabled selected value="">
                          --Please Select--
                        </option>
                        {colors.map((color, index) => (
                          <option key={index} value={color.colorName}>
                            {color.colorName.charAt(0).toUpperCase() +
                              color.colorName.slice(1, color.colorName.length)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="quickview-btn-cart d-flex align-items-center">
                      <div className="cart-count-detail">
                        <label>Count: </label>
                        <input
                          onChange={(e) =>
                            setCartCount(parseInt(e.target.value))
                          }
                          type="number"
                          min={0}
                          name="qtybutton"
                          placeholder="0"
                          className="cart-plus-minus-box"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="quickview-plus-minus text-center w-100">
                    <div className="add-to-card-list text-center w-100">
                      <button className="w-100" type="submit">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </form>
                {}
                {isAuthenticated &&
                  (!userAddedReview ? (
                    <div className="review-div mx-3">
                      <button
                        onClick={() => setLeaveReviewToggle(!leaveReviewToggle)}
                        className="review-btn my-3"
                      >
                        Leave Review?
                      </button>
                      {leaveReviewToggle ? (
                        <form onSubmit={addReview} className="leave-review">
                          <textarea
                            onChange={(e) => setReviewBody(e.target.value)}
                            className="text-review"
                            rows={5}
                            cols={60}
                          ></textarea>
                          <br />
                          <select
                            onChange={(e: any) => setReviewRank(e.target.value)}
                            className="select-review"
                            name=""
                            id=""
                          >
                            <option
                              style={{ color: "black" }}
                              disabled
                              selected
                              value=""
                            >
                              --Select Rate--
                            </option>
                            <option value={1}>&#9733; </option>
                            <option value={2}>&#9733; &#9733;</option>
                            <option value={3}>&#9733; &#9733; &#9733;</option>
                            <option value={4}>
                              &#9733; &#9733; &#9733; &#9733;
                            </option>
                            <option value={5}>
                              &#9733; &#9733; &#9733; &#9733; &#9733;
                            </option>
                          </select>
                          <br />
                          <button className="review-btn my-2">
                            Add Review
                          </button>
                        </form>
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : (
                    <div className="my-2">
                      <span className="thanks-review">
                        Thanks for your review!
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <hr />
        </div>
      </div>
      <DescriptionReview
        productDescription={product?.productDescription}
        reviews={reviews}
      />
      <RelatedProduct relatedProducts={relatedProducts} />
    </>
  );
};

export default Details;
