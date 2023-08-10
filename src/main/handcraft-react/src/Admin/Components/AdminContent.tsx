import React, { useEffect, useState } from "react";
import MessageList from "./Messages/MessageList";
import AdminInfoContent from "./AdminInfoContent";
import ProductModel from "../../Models/ProductModel";
import { Link } from "react-router-dom";
import { Table, Label } from "semantic-ui-react";
import PaymentModel from "../../Models/PaymentModel";
import PaymentListCard from "./Payments/PaymentListCard";

const AdminContent = () => {
  const [productError, setProductError] = useState("");
  const [totalProduct, setTotalProduct] = useState(0);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [payments, setPayments] = useState<PaymentModel[]>();
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [soldProducts, setSoldProducts] = useState(0);
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const url = "http://localhost:8080/api/checkouts?sort=checkoutId,desc";
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseJson = await response.json();
        if (payments) {
          setSoldProducts(payments?.length);
        } else {
          setPayments(responseJson._embedded.checkouts);
        }
        let total = 0;
        payments?.forEach((payment: PaymentModel) => {
          total += payment.checkoutBill.totalPrice;
          setTotalRevenue(total);
        });
      } catch (error: any) {
        setProductError(error.message);
      }
    };
    fetchPayments();
  }, [totalRevenue, soldProducts, payments]);
  console.log(totalRevenue);
  useEffect(() => {
    const fetchProducts = async () => {
      const url = "http://localhost:8080/api/products?sort=createdAt,asc";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseJson = await response.json();
      setProducts(responseJson._embedded.products);
      setTotalProduct(responseJson.page.totalElements);
    };
    fetchProducts().catch((e: any) => setProductError(e.message));
  }, []);
  return (
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <AdminInfoContent
              totalProduct={totalProduct}
              totalRevenue={totalRevenue}
              soldProducts={soldProducts}
            />
          </div>
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body">
                  <Label
                    color="olive"
                    size="large"
                    className="header-title mt-0 mb-3"
                  >
                    Admin Inbox
                  </Label>
                  <div className="inbox-widget">
                    <MessageList />
                  </div>
                </div>
                <div className="card-body mt-2">
                  <Label
                    color="orange"
                    size="large"
                    className="header-title mt-0 mb-3"
                  >
                    Checkout Bills
                  </Label>
                  <div className="inbox-widget">
                    <PaymentListCard payments={payments} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="card">
                <div className="card-body">
                  <div className="admin-products">
                    <Label
                      color="teal"
                      size="large"
                      className="header-title mt-0 mb-3"
                    >
                      Latest Added Products
                    </Label>

                    <div className="table-responsive">
                      <Table celled fixed>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>
                              Discounted Price
                            </Table.HeaderCell>
                            <Table.HeaderCell>Created At</Table.HeaderCell>
                            <Table.HeaderCell>Management</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>

                        <Table.Body>
                          {products
                            ?.slice(0, 7)
                            .map((product: ProductModel, index: number) => (
                              <Table.Row key={index}>
                                <Table.Cell>{product?.productId}</Table.Cell>
                                <Table.Cell>{`${product?.productName.slice(
                                  0,
                                  15
                                )}...`}</Table.Cell>
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
                                    className="badge bg-warning"
                                    style={{ fontSize: "14px" }}
                                  >
                                    {product.discountedPrice
                                      ? product.discountedPrice
                                      : 0}
                                    $
                                  </span>
                                </Table.Cell>
                                <Table.Cell>
                                  {product.createdAt?.slice(0, 16)}
                                </Table.Cell>
                                <Table.Cell style={{ textAlign: "center" }}>
                                  <Link
                                    to={`/admin/editproduct:${product.productId}`}
                                  >
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <script>document.write(new Date().getFullYear())</script> &copy;
              Adminto theme by <a href="#">Coderthemes</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminContent;
