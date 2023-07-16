import { useEffect, useState } from "react";
import ProductModel from "../Models/ProductModel";
import Spinner from "../Utils/Spinner";
import SearchItem from "./Components/SearchItem";
import CategoryModel from "../Models/CategoryModel";
import React from "react";
import { fetchProductByAllInputs } from "../Utils/SearchFunction";
import Pagination from "../Utils/Pagination";

const SearchProductPage = () => {
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [products, setProducts] = useState<ProductModel[]>([]);
  
  
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage,setProductPerPage] = useState(9);



  const [totalElements, setTotalElements] = useState(0);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [invalidChar, setInvalidChar] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [priceError, setPriceError] = useState(false);
  const [gridView,setGridView] = useState(true)
  const [sortUrl,setSortUrl] = useState("&sort=")

  // Fetching Searched Products || All Products
  useEffect(() => {
    try {
      fetchProductByAllInputs(
        searchTitle,
        categoryId,
        minPrice,
        maxPrice,
        setProducts,
        setPriceError,
        currentPage,productPerPage,
        setTotalPages,
        setTotalElements,
        sortUrl
      );

    } catch (err: any) {
      setHttpError(err.message);
    }
  }, [searchTitle, categoryId, minPrice, maxPrice,currentPage,gridView,sortUrl]);

  // Fetching Categories
  useEffect(() => {
    const fetchCategories = async () => {
      const url = "http://localhost:8080/api/categories";
      const responseData = await fetch(url);
      if (!responseData.ok) {
        throw new Error("Something went wrong during fetching product!");
      }
      const responseJson = await responseData.json();
      setCategories(responseJson._embedded.categories);
      setIsLoadingProduct(false);
    };
    fetchCategories().catch((err) => setHttpError(err.message));
  }, []);



  if (isLoadingProduct) {
    return <Spinner />;
  }

  if (httpError) {
    return <>{httpError}</>;
  }

  const handleSearchInputValidInput = (input: string) => {
    const modifiedInput = input.replace(/[^a-zA-Z0-9 ]/g, "#");
    if (modifiedInput.includes("#")) {
      setInvalidChar(true);
    } else {
      setSearchTitle(input);
      setInvalidChar(false);
    }
  };

  const handleSortUrl= (value:string)=>{
    switch(value){
      case "asc": setSortUrl("&sort=productName,asc"); break;
      case "desc": setSortUrl("&sort=productName,desc"); break;
      case "priceasc": setSortUrl("&sort=price,asc"); break;
      case "pricedesc": setSortUrl("&sort=price,desc"); break;
      case "default": setSortUrl("&sort="); break;
    }
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({top:5,behavior:"smooth"})
  }
  return (
    <>
      <div>
        <div className="shop-page-wrapper ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="shop-sidebar">
                  <div className="sidebar-widget mb-50">
                    <h3 className="sidebar-title mb-3 mt-2">Search Products</h3>
                    {invalidChar ? (
                      <p className="error-search">
                        Please enter valid product title
                      </p>
                    ) : (
                      <></>
                    )}
                    <div
                      className={
                        invalidChar
                          ? "sidebar-search invalid-search"
                          : "sidebar-search"
                      }
                    >
                      <input
                        className="search-bar"
                        placeholder="Search Products..."
                        type="text"
                        onChange={(e) =>
                          handleSearchInputValidInput(e.target.value)
                        }
                      >
                      </input>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-search"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="sidebar-widget mt-4">
                    <h3 className="sidebar-title mb-3 ">Filter by Price</h3>
                    {priceError ? (
                      <p className="error-search">
                        Max and Min prices should be corresponding order!
                      </p>
                    ) : (
                      <></>
                    )}
                    <div className="price_filter">
                      <div id="slider-range"></div>
                      <div className="price_slider_amount">
                        <div className="label-input d-flex align-items-center">
                          <input
                            type="number"
                            className="amount"
                            name="price"
                            placeholder="Min Price"
                            min={0}
                            onChange={(e) => {
                              setMinPrice(parseInt(e.target.value));
                            }}
                          />
                          <span className="px-2">-</span>
                          <input
                            type="number"
                            className="amount"
                            name="price"
                            placeholder="Max Price"
                            min="0"
                            onChange={(e) => {
                              setMaxPrice(parseInt(e.target.value));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-widget mb-45">
                    <h3 className="sidebar-title mt-4 mb-3">Categories</h3>
                    <div className="sidebar-categories">
                      <ul className="m-0 p-0 category-item">
                        <li
                          className={categoryId === 0 ? "active-category" : ""}
                        >
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-dash-lg mb-1"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
                              />
                            </svg>
                          </span>
                          <p onClick={() => setCategoryId(0)}>All Categories</p>
                        </li>
                        {categories.map((category, index) => (
                          <li
                            className={
                              categoryId === category.categoryId
                                ? "active-category"
                                : ""
                            }
                            key={index}
                            onClick={() => setCategoryId(category.categoryId)}
                          >
                            <span className="">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-dash-lg mb-1"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
                                />
                              </svg>
                            </span>
                            <p>{category.categoryName}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                </div>
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                <div className="shop-product-wrapper">
                  <div className="shop-bar-area">
                    <div className="shop-bar pb-60">
                      <div className="shop-found-selector">
                        <div className="shop-found">
                          <p>
                            <span></span>Number of Product Found: <span>{totalElements}</span>
                          </p>
                        </div>
                        <div className="shop-selector">
                          <label>Sort By : </label>
                          <select className="sort-input" name="select" onChange={(e) => handleSortUrl(e.target.value)}>
                            <option  value="default">Default</option>
                            <option value="asc">  A to Z  </option>
                            <option  value="desc"> Z to A</option>
                            <option  value="priceasc"> Price Asc</option>
                            <option  value="pricedesc"> Price Desc</option>

                          </select>
                        </div>
                      </div>
                      <div className="shop-filter-tab">
                        <div className="shop-tab nav" role="tablist">
                          <a
                            className="active"
                            data-bs-toggle="tab"
                            role="tab"
                            aria-selected="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="26"
                              height="26"
                              fill="currentColor"
                              className="bi bi-grid-3x3-gap view-svg"
                              viewBox="0 0 16 16"
                              onClick={() =>{setGridView(true) } }
                            >
                              <path d="M4 2v2H2V2h2zm1 12v-2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm5 10v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM9 2v2H7V2h2zm5 0v2h-2V2h2zM4 7v2H2V7h2zm5 0v2H7V7h2zm5 0h-2v2h2V7zM4 12v2H2v-2h2zm5 0v2H7v-2h2zm5 0v2h-2v-2h2zM12 1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2z" />
                            </svg>
                          </a>
                          <a
                            data-bs-toggle="tab"
                            role="tab"
                            aria-selected="true"
                          >
                            <svg
                            style={{cursor:"pointer"}}
                              xmlns="http://www.w3.org/2000/svg"
                              width="26"
                              height="26"
                              fill="currentColor"
                              className="bi bi-list view-svg"
                              viewBox="0 0 16 16"
                              onClick={()=>{setGridView(false)}}
                            >
                              <path
                                fillRule="evenodd"
                                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                              />
                            </svg>{" "}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="shop-product-content tab-content">
                      <div
                        id="grid-sidebar7"
                        className="tab-pane fade active show"
                      >
                        <div className="row">
                          {products.length == 0 ? (
                            <p className="nothing-found">
                              Nothing can be found!
                            </p>
                          ) : (
                            products.map((product) => (
                              <SearchItem
                              productId = {product.productId}
                              gridView = {gridView}
                                product={product}
                                key={product.productId}
                              />
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {totalElements >=9 ? 
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>
              :<></>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchProductPage;
