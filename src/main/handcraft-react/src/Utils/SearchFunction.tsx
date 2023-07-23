import { Dispatch, SetStateAction } from "react";
import ProductModel from "../Models/ProductModel";

const fetchProductByAllInputs = async (
  searchTitle: string,
  categoryId: number,
  minPrice: number,
  maxPrice: number,
  setProducts: Dispatch<SetStateAction<ProductModel[]>>,
  setPriceError: Dispatch<SetStateAction<boolean>>,
  currentPage:number,
  productPerPage:number,
  setTotalPages: Dispatch<SetStateAction<number>>,
  setTotalElements: Dispatch<SetStateAction<number>>,
  sortUrl:string
) => {

  if (
    isNaN(maxPrice) || isNaN(minPrice)
  ) {
    setPriceError(true);
  } else {
    setPriceError(false);
   
    let url = "";
    if (
      searchTitle !== "" &&
      categoryId !== 0 &&
      minPrice !== 0 &&
      maxPrice !== 10000
    ) {
      url = `http://localhost:8080/api/products/search/findByProductNameContainingIgnoreCaseAndCategoryAndPriceBetween?productName=${searchTitle}&category=${categoryId}%20&minPrice=${minPrice}%20&maxPrice=${maxPrice}%20&page=${currentPage - 1}&size=${productPerPage}`;
    } else if (
      searchTitle !== "" &&
      categoryId !== 0 &&
      minPrice === 0 &&
      maxPrice === 10000
    ) {
      url = `http://localhost:8080/api/products/search/findByProductNameContainingIgnoreCaseAndCategory?productName=${searchTitle}&category=${categoryId}%20`;
    } else if (
      searchTitle !== "" &&
      categoryId === 0 &&
      minPrice === 0 &&
      maxPrice === 10000
    ) {
      url = `http://localhost:8080/api/products/search/findByProductNameContainingIgnoreCase?productName=${searchTitle}&page=${currentPage - 1}&size=${productPerPage}`;
    } else if (
      searchTitle !== "" &&
      categoryId === 0 &&
      minPrice !== 0 &&
      maxPrice !== 10000
    ) {
      url = `http://localhost:8080/api/products/search/findByProductNameContainingIgnoreCaseAndPriceBetween?productName=${searchTitle}&minPrice=${minPrice}%20&maxPrice=${maxPrice}%20&page=${currentPage - 1}&size=${productPerPage}`;
    } else if (
      searchTitle === "" &&
      categoryId !== 0 &&
      minPrice !== 0 &&
      maxPrice !== 10000
    ) {
      url = `http://localhost:8080/api/products/search/findByCategoryAndPriceBetween?category=${categoryId}%20&minPrice=${minPrice}%20&maxPrice=${maxPrice}%20&page=${currentPage - 1}&size=${productPerPage}`;
    } else if (
      searchTitle === "" &&
      categoryId !== 0 &&
      minPrice === 0 &&
      maxPrice === 10000
    ) {
      url = `http://localhost:8080/api/products/search/findByCategory?category=${categoryId}%20&page=${currentPage - 1}&size=${productPerPage}`;
    } else if (
      searchTitle === "" &&
      categoryId === 0 &&
      minPrice !== 0 &&
      maxPrice !== 10000
    ) {
      url = `http://localhost:8080/api/products/search/findByPriceBetween?minPrice=${minPrice}%20&maxPrice=${maxPrice}%20&page=${currentPage - 1}&size=${productPerPage}`;
    } else {
      url = `http://localhost:8080/api/products?page=${currentPage - 1}&size=${productPerPage}`;
    }
    if(sortUrl !=="&sort="){
      url +=sortUrl
    }
    if(maxPrice> minPrice){
      const responseData = await fetch(url);
      if (!responseData.ok) {
        throw new Error("Something went wrong!");
      }
      const responseJson = await responseData.json();
      setTotalPages(responseJson.page.totalPages)
      setProducts(responseJson._embedded.products);
      setTotalElements(responseJson.page.totalElements)
    }else{
      setPriceError(true)
    }
  }
};

export { fetchProductByAllInputs };
