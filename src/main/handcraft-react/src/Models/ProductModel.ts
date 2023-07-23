import ColorModel from "./ColorModel";

class ProductModel {
  productId: number;
  discount: number;
  rating: number;
  price: number;
  productName: string;
  productDescription: string;
  discountedPrice:number;
  color:ColorModel[]
  constructor(
    productId: number,
    discount: number,
    rating: number,
    price: number,
    productName: string,
    productDescription: string,
    discountedPrice:number,
    color:ColorModel[]
  ) {
    this.productId = productId;
    this.discount = discount;
    this.rating=rating;
    this.price = price;
    this.productName = productName;
    this.productDescription = productDescription;
    this.discountedPrice = discountedPrice;
    this.color = color
  }
}
export default ProductModel;
