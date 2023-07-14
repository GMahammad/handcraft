import React, { useEffect, useState } from "react";
import ProductModel from "../../Models/ProductModel";
import Spinner from "../../Utils/Spinner";
import { Link } from "react-router-dom";

const SearchItem: React.FC<{ product: ProductModel; key: number }> = (
  props
) => {
  const [images, setImages] = useState([]);
  const [httpError, setHttpError] = useState('');
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const url = `http://localhost:8080/api/v1/products/getImages?productId=${props.product.productId}`;
      const responseData = await fetch(url);
      const responseJson = await responseData.json();
      if(!responseData.ok){
        throw new Error("Something went during fetching images wrong!")
      }
      setImages(responseJson);
      setIsLoadingImage(false);
    };
    fetchImages().catch((err) => {
      setHttpError(err.message);
    });
  }, []);

  if(isLoadingImage){
    return <Spinner/>
  }
  if(httpError){
    return <p>{httpError}</p>
  }
  return (
    <>

      <div className="col-lg-4 col-md-6">
        <div className="product-wrapper product-box-style my-3 ">
          <div className="product-img">
            <Link  to={`/detail:${props.product.productId}`}>
              <img className="search-product-image" src={images[1]} alt="" />
            </Link>
            <div className="product-action">
              <a className="animate-top" title="Add To Cart" href="#">
                <i className="pe-7s-cart"></i>
              </a>
            </div>
          </div>
          <div className="product-content">
            <h6>
              <a href="#">{props.product.productName.length > 30 ? `${props.product.productName.slice(0,30)}...` : props.product.productName} </a>
            </h6>
            <span>${props.product.price}</span>
          </div>
        </div>
      </div>
      {/* <div id="grid-sidebar8" className="tab-pane fade">
                        <div className="row">
                          <div className="col-lg-12 mb-3  ">
                            <div className="product-wrapper my-3 single-product-list product-list-right-pr mb-60">
                              <div className="product-img list-img-width">
                                <a href="#">
                                  <img
                                    className="search-product-image"
                                    src={require("../Assets/Images/4.jpg")}
                                    alt=""
                                  />
                                </a>
                                <div className="product-action-list-style"></div>
                              </div>
                              <div className="product-content-list">
                                <div className="product-list-info">
                                  <h4>
                                    <a href="#">Homme Tapered Smart </a>
                                  </h4>
                                  <span>$150.00</span>
                                  <p>
                                    Lorem ipsum dolor sit amet, mana consectetur
                                    adipisicing elit, sed do eiusmod tempor
                                    labore.{" "}
                                  </p>
                                </div>
                                <div className="product-list-cart-wishlist">
                                  <div className="product-list-cart">
                                    <a
                                      className="btn-hover list-btn-style"
                                      href="#"
                                    >
                                      add to cart
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12 mb-3  ">
                            <div className="product-wrapper my-3 single-product-list product-list-right-pr mb-60">
                              <div className="product-img list-img-width">
                                <a href="#">
                                  <img
                                    className="search-product-image"
                                    src={require("../Assets/Images/4.jpg")}
                                    alt=""
                                  />
                                </a>
                                <div className="product-action-list-style"></div>
                              </div>
                              <div className="product-content-list">
                                <div className="product-list-info">
                                  <h4>
                                    <a href="#">Denim Stonewash</a>
                                  </h4>
                                  <span>$180.00</span>
                                  <p>
                                    Lorem ipsum dolor sit amet, mana consectetur
                                    adipisicing elit, sed do eiusmod tempor
                                    labore.{" "}
                                  </p>
                                </div>
                                <div className="product-list-cart-wishlist">
                                  <div className="product-list-cart">
                                    <a
                                      className="btn-hover list-btn-style"
                                      href="#"
                                    >
                                      add to cart
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12 mb-3  ">
                            <div className="product-wrapper my-3 single-product-list product-list-right-pr mb-60">
                              <div className="product-img list-img-width">
                                <a href="#">
                                  <img
                                    className="search-product-image"
                                    src={require("../Assets/Images/4.jpg")}
                                    alt=""
                                  />
                                </a>
                                <div className="product-action-list-style"></div>
                              </div>
                              <div className="product-content-list">
                                <div className="product-list-info">
                                  <h4>
                                    <a href="#">Mini Waffle 5 Pack</a>
                                  </h4>
                                  <span>$130.00</span>
                                  <p>
                                    Lorem ipsum dolor sit amet, mana consectetur
                                    adipisicing elit, sed do eiusmod tempor
                                    labore.{" "}
                                  </p>
                                </div>
                                <div className="product-list-cart-wishlist">
                                  <div className="product-list-cart">
                                    <a
                                      className="btn-hover list-btn-style"
                                      href="#"
                                    >
                                      add to cart
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
    </>
  );
};

export default SearchItem;
