import CheckoutBill from "./CheckoutBill";

class PaymentModel {
  checkoutId: number;
  firstName: string;
  lastName: string;
  streetAddress: string;
  apartmentAddress: string;
  city: string;
  zipCode: string;
  email: string;
  phone: string;
  createdAt: string;
  checkEnum:any;
  checkoutBill: {
    bill: Record<string, number>; // Explicitly type the bill property
    totalPrice: number;
  };
  isPaid: boolean;
  constructor(
    checkoutId: number,
    firstName: string,
    lastName: string,
    streetAddress: string,
    apartmentAddress: string,
    city: string,
    zipCode: string,
    email: string,
    phone: string,
    isPaid: boolean,
    createdAt: string,
    checkoutBill: any,
    checkEnum:any
  ) {
    this.checkoutId = checkoutId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.streetAddress = streetAddress;
    this.apartmentAddress = apartmentAddress;
    this.city = city;
    this.zipCode = zipCode;
    this.email = email;
    this.phone = phone;
    this.createdAt = createdAt;
    this.checkoutBill = checkoutBill;
    this.isPaid = isPaid;
    this.checkEnum = checkEnum
  }
}
export default PaymentModel;
