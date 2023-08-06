class HomePageModel {
  carouselImages: string[];
  bannerProductId: number;
  constructor(carouselImages: string[], bannerProductId: number) {
    this.carouselImages = carouselImages;
    this.bannerProductId = bannerProductId;
  }
}
export default HomePageModel;