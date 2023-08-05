class ReviewModel {
  reviewId: number;
  reviewBody: string;
  userEmail:string;
  ranking: number;
  createdAt: string;
  userId: number;
  productId: number;
  constructor(
    reviewId: number,
    reviewBody: string,
    userEmail:string,
    ranking: number,
    createdAt: string,
    userId: number,
    productId: number
  ) {
    this.reviewId = reviewId;
    this.reviewBody = reviewBody;
    this.userEmail=userEmail;
    this.ranking = ranking;
    this.createdAt = createdAt;
    this.userId = userId;
    this.productId = productId;
  }
}
export default ReviewModel;
