import React, { useEffect, useState } from "react";
import { Label, Table } from "semantic-ui-react";
import PaymentModel from "../../../Models/PaymentModel";
import { Link } from "react-router-dom";

const PaymentPage = () => {
  const [payments, setPayments] = useState<PaymentModel[]>();
  const [httpError, setHttpError] = useState<string>("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const url = "http://localhost:8080/api/checkouts";
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseJson = await response.json();
        setPayments(responseJson._embedded.checkouts);
      } catch (error: any) {
        setHttpError(error.message);
      }
    };

    fetchPayments();
  }, []);
  console.log(payments);

  return (
    <div className="content-page">
      <h2 className="text-center">PaymentPage</h2>
      <hr />
      <Table celled fixed>
        <Table.Header>
          <Table.HeaderCell width={1}>ID</Table.HeaderCell>
          <Table.HeaderCell width={2}>Customer Name</Table.HeaderCell>
          <Table.HeaderCell width={3}>Email</Table.HeaderCell>
          <Table.HeaderCell width={1}>Price</Table.HeaderCell>
          <Table.HeaderCell width={1}>Is Paid</Table.HeaderCell>
          <Table.HeaderCell width={2}>Checkout Items</Table.HeaderCell>
          <Table.HeaderCell>Created At</Table.HeaderCell>
          <Table.HeaderCell>Manage</Table.HeaderCell>
        </Table.Header>

        <Table.Body>
          {payments?.map((payment: PaymentModel, index: number) => (
            <Table.Row key={index}>
              <Table.Cell>{payment.checkoutId}</Table.Cell>
              <Table.Cell>{`${payment.firstName} ${payment.lastName}`}</Table.Cell>
              <Table.Cell>{payment.email}</Table.Cell>
              <Table.Cell>${payment.checkoutBill.totalPrice}</Table.Cell>
              <Table.Cell className="">{payment && payment.isPaid ? payment.isPaid.toString() : "false"}</Table.Cell>
              <Table.Cell className="text-center">
                {payment.checkEnum === "PENDING" ? (
                  <Label color="yellow" >
                    {payment.checkEnum}
                  </Label>
                ) : payment.checkEnum === "APPROVED" ? (
                  <Label color="green" >APPROVED</Label>
                ) : (
                  <Label color="red">REJECTED</Label>
                )}
              </Table.Cell>
              <Table.Cell>{payment.createdAt}</Table.Cell>
              <Table.Cell>
                <Link to={`/admin/payments:${payment.checkoutId}`} className="btn btn-warning">
                  Enter Checkout
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default PaymentPage;
