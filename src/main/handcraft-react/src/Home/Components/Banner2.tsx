import { Link } from "react-router-dom";

const Banner2 = () => {
  return (
    <>
      <div className="handicraft-banner-area pt-50 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 mt-5">
              <div className="handicraft-banner-wrapper">
                <img src={require("../../Assets/Images/25.jpg")} alt="" />
                <div className="handicraft-banner-position handicraft-banner-content">
                  <h3>
                    Make Yourself More <br />
                    Smart
                  </h3>
                  <Link className="banner-btn btn-hover" to="/search">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 mt-5">
              <div className="handicraft-banner-wrapper">
                <img src={require("../../Assets/Images/26.jpg")} alt="" />
                <div className="handicraft-banner-position2 handicraft-banner-content">
                  <h3>
                    Make Yourself <br />
                    More Smart
                  </h3>
                  <Link className="banner-btn btn-hover" to="/search">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner2;
