import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon } from "semantic-ui-react";

const PaymentCompleted = () => {
  return (
    <div className="">
        
    <Card color="green" centered className="mt-5 mb-3">
        <Card.Content><h3 className="text-center" style={{color:"#21BA45"}}>Payment Info</h3></Card.Content>
      <Card.Content className="text-center">Payment completed Successfully!</Card.Content>
      <Icon name="thumbs up outline" color="green" size="big" className="w-100 text-center my-2"></Icon>
      <Card.Content className="text-center">You can check your invoice on your email. You will get more information about delivery date and status. Thanks for shopping and choosing us.</Card.Content>
      <Icon name="handshake outline" color="green" size="big" className="w-100 text-center my-1 mb-2"></Icon>
      <Link className="btn btn-secondary" to="/">Back to Home</Link>
    </Card>
    </div>
  );
};

export default PaymentCompleted;
