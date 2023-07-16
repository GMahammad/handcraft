interface Category {
  categoryName: string;
}

class ProductModel {
  productId: number;
  discount: number;
  rating: number;
  images: string[];
  price: number;
  productName: string;
  productDescription: string;
  discountedPrice:number;
  category: object;
  constructor(
    productId: number,
    discount: number,
    rating: number,
    images: string[],
    price: number,
    productName: string,
    productDescription: string,
    discountedPrice:number,
    category: Category
  ) {
    this.productId = productId;
    this.discount = discount;
    this.rating=rating;
    this.images = images;
    this.price = price;
    this.productName = productName;
    this.productDescription = productDescription;
    this.discountedPrice = discountedPrice;
    this.category = category;
  }
}
export default ProductModel;
