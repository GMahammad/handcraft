import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import ProductModel from "../../../Models/ProductModel";
import ModalExampleModal from "../../../Utils/ModalExampleModal";
import { useSelector } from "react-redux";
import CategoryModel from "../../../Models/CategoryModel";
import { fetchProductByAllInputs } from "../../../Utils/SearchFunction";
import Pagination from "../../../Utils/Pagination";
import { Link } from "react-router-dom";
const ProductManagementPage = () => {
  const { isAuthenticated, isAdmin, tokenType, accessToken } = useSelector(
    (store: any) => store.auth
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<number>(0);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(9);

  const [totalElements, setTotalElements] = useState(0);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [invalidChar, setInvalidChar] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [priceError, setPriceError] = useState(false);
  const [gridView, setGridView] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [sortUrl, setSortUrl] = useState("&sort=");

  useEffect(() => {
    try {
      fetchProductByAllInputs(
        searchTitle,
        categoryId,
        minPrice,
        maxPrice,
        setProducts,
        setPriceError,
        currentPage,
        productPerPage,
        setTotalPages,
        setTotalElements,
        sortUrl
      );
      if (window.innerWidth <= 770) {
        setMobile(true);
        setGridView(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  }, [
    searchTitle,
    categoryId,
    minPrice,
    maxPrice,
    currentPage,
    gridView,
    sortUrl,
    deleteConfirm,
  ]);

  const handleSearchInputValidInput = (input: string) => {
    const modifiedInput = input.replace(/[^a-zA-Z0-9 ]/g, "#");
    if (modifiedInput.includes("#")) {
      setInvalidChar(true);
    } else {
      setSearchTitle(input);
      setInvalidChar(false);
    }
  };

  const handleSortUrl = (value: string) => {
    switch (value) {
      case "asc":
        setSortUrl("&sort=productName,asc");
        break;
      case "desc":
        setSortUrl("&sort=productName,desc");
        break;
      case "priceasc":
        setSortUrl("&sort=price,asc");
        break;
      case "pricedesc":
        setSortUrl("&sort=price,desc");
        break;
      case "default":
        setSortUrl("&sort=");
        break;
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const url = "http://localhost:8080/api/categories";
      const responseData = await fetch(url);
      if (!responseData.ok) {
        throw new Error("Something went wrong during fetching product!");
      }
      const responseJson = await responseData.json();
      setCategories(responseJson._embedded.categories);
    };
    fetchCategories().catch((err) => setErrorMessage(err.message));
  }, []);

  const handleConfirmDelete = (value: number) => {
    const fetchDeleteProduct = async () => {
      try {
        const url = `http://localhost:8080/api/v1/products/admin/deleteproduct?productId=${value}%20`;
        const requestBody = {
          method: "DELETE",
          headers: {
            Authorization: `${tokenType} ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
        if (isAuthenticated && isAdmin) {
          const request = await fetch(url, requestBody);
          if (!request.ok) {
            throw new Error("Something went wrong during deleting product!");
          }
          const response = await request.json();
          alert(response.message);
          setDeleteConfirm(1);
        }
      } catch (e: any) {
        setErrorMessage(e.message);
      }
    };
    fetchDeleteProduct().catch((e: any) => setErrorMessage(e.message));
    setDeleteConfirm(0);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 5, behavior: "smooth" });
  };

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <>
      <div className="content-page">
        <div className="product-admin-head">
          <Link to="/admin/createproduct">
            <button className="btn btn-lg btn-primary waves-effect waves-light my-2 w-100">
              Add Product
            </button>
          </Link>
          <div className="shop-sidebar my-3 ">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                  <div className="sidebar-widget">
                    <h3 className="sidebar-title ">Search Products</h3>
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
                      ></input>
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
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                  <div className="sidebar-widget">
                    <h3 className="sidebar-title pb-1">Filter by Price</h3>
                    {priceError ? (
                      <p className="error-search">
                        Max and Min prices should be corresponding order!
                      </p>
                    ) : (
                      <></>
                    )}
                    <div className="price_filter">
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
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                  <div className="shop-selector">
                    <h3 className="pb-2">Sort By : </h3>
                    <select
                      className="sort-input"
                      name="select"
                      onChange={(e) => handleSortUrl(e.target.value)}
                    >
                      <option value="default">Default</option>
                      <option value="asc"> A to Z </option>
                      <option value="desc"> Z to A</option>
                      <option value="priceasc"> Price Asc</option>
                      <option value="pricedesc"> Price Desc</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
        <Table celled fixed >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Discount</Table.HeaderCell>
              <Table.HeaderCell>Discounted Price</Table.HeaderCell>
              <Table.HeaderCell>Created At</Table.HeaderCell>
              <Table.HeaderCell>Management</Table.HeaderCell>

            </Table.Row>
          </Table.Header>

          <Table.Body>
              {products?.map((product: ProductModel, index: number) => (
              <Table.Row key={index} >
                  <Table.Cell>{product?.productId}</Table.Cell>
                  <Table.Cell>{`${product?.productName.slice(0, 15)}...`}</Table.Cell>
                  <Table.Cell>{`${product?.productDescription.slice(0, 20)}...`}</Table.Cell>
                  <Table.Cell>
                    <span
                      style={{ fontSize: "14px" }}
                      className="badge bg-success"
                    >
                      {product?.price}$
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      style={{ fontSize: "14px" }}
                      className="badge bg-warning"
                    >
                      {product?.discount}%
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <span
                      className="badge bg-danger"
                      style={{ fontSize: "14px" }}
                    >
                      {product.discountedPrice ? product.discountedPrice : 0}$
                    </span>
                  </Table.Cell>
                  <Table.Cell>{product.createdAt?.slice(0, 16)}</Table.Cell>
                  <Table.Cell style={{textAlign:"center"}}>
                    <ModalExampleModal
                      confirmDelete={handleConfirmDelete}
                      buttonName="Delete"
                      modalHeader="Delete Product"
                      modalContent="You clicked to delete the selected product. Are you sure deleting
                       product ? If you clicked Yes your product will be deleted!"
                      productId={product.productId || 0}
                    />
                    <Link to={`/admin/editproduct:${product.productId}`}>
                    <button className="btn btn-outline-warning waves-effect waves-light mx-2">
                      Edit
                    </button>
                    </Link>
                    <Link to={`/detail:${product.productId}`}>
                      <button className="btn btn-outline-success waves-effect waves-light">
                        Preview
                      </button>
                    </Link>
                  </Table.Cell>
              </Table.Row>
              ))}
          
          </Table.Body>
        </Table>
        
          {products.length === 0 && (
            <p className="nothing-found">Nothing can be found!</p>
          )}
          <div className="my-2">
            {totalElements >= 9 ? (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductManagementPage;
