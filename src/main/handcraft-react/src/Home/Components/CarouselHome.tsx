import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
const CarouselHome = () => {
  return (
    <div className="carousel-main">
    <Carousel showThumbs={false}  showStatus={false} autoFocus={true} centerMode={true} autoPlay={true} infiniteLoop={true}>
      <div>  
        <img src="https://img.freepik.com/free-photo/mid-century-modern-living-room-interior-design-with-monstera-tree_53876-129805.jpg?w=2000" />
      </div>
      <div>
        <img src="https://img.freepik.com/free-photo/mid-century-modern-living-room-interior-design-with-monstera-tree_53876-129803.jpg" />
      </div>
      <div>
        <img src="https://img.freepik.com/premium-photo/living-room-with-wooden-chair-lamp-wall_899870-23915.jpg?w=360" />
      </div>
    </Carousel>
    <div className="my-5"></div>

    </div>
  );
};

export default CarouselHome;
