import CheckoutBill from "../CheckoutBill";

class CheckoutRequest {
  firstName: string;
  lastName: string;
  street: string;
  apartment: string;
  city: string;
  zip: string;
  email: string;
  phone:string;
  checkoutBill: CheckoutBill;
  constructor(
    firstName: string,
    lastName: string,
    street: string,
    apartment: string,
    city: string,
    zipCode: string,
    email: string,
    phone:string,
    checkoutBill: CheckoutBill
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.street = street;
    this.apartment = apartment;
    this.city = city;
    this.zip = zipCode;
    this.email = email;
    this.phone = phone;
    this.checkoutBill = checkoutBill;
  }
}
export default CheckoutRequest;
