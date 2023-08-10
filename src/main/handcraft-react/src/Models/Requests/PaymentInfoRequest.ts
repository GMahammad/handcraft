import CheckoutRequest from "./CheckoutRequest";

class PaymentInfoRequest {
  currency: string;
  checkoutRequest: CheckoutRequest;
  constructor(currency: string, checkoutRequest: CheckoutRequest) {
    this.currency = currency;
    this.checkoutRequest = checkoutRequest;
  }
}

export default PaymentInfoRequest;
