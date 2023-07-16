import React from "react";

const AboutUs = () => {
  return (
    <>
      <div className="about-story pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="story-img">
                <img src={require("../Assets/Images/11.png")} alt="" />
                <div className="about-logo">
                  <h3>HCraft</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="story-details pl-5">
                <div className="story-details-top">
                  <h2>
                    WELCOME TO <span>HandCraft</span>
                  </h2>
                  <p>
                    Handcraft provide how all this mistaken idea of denouncing
                    pleasure and sing pain was born an will give you a complete
                    account of the system, and expound the actual teachings of
                    the eat explorer.{" "}
                  </p>
                </div>
                <div className="story-details-bottom">
                  <h4>WE START AT 2015</h4>
                  <p>
                    Handcraft provide how all this mistaken idea of denouncing
                    pleasure and sing pain was born an will give you a complete
                    account of the system, and expound the actual teachings of
                    the eat explorer.
                  </p>
                </div>
                <div className="story-details-bottom">
                  <h4>WIN BEST ONLINE SHOP AT 2022</h4>
                  <p>
                    Handcraft provide how all this mistaken idea of denouncing
                    pleasure and sing pain was born an will give you a complete
                    account of the system, and expound the actual teachings of
                    the eat explorer.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="goal-area pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="goal-wrapper mb-30">
                <h3>OUR VISSION</h3>
                <p>
                  Handcraft provide how all this mistaken idea of denouncing
                  pleasure and sing pain was born an will give you a ete account
                  of the system, and expound the actual teangs of the eat
                  explorer of the truth.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="goal-wrapper mb-30">
                <h3>OUR MISSION</h3>
                <p>
                  Handcraft provide how all this mistaken idea of denouncing
                  pleasure and sing pain was born an will give you a ete account
                  of the system, and expound the actual teangs of the eat
                  explorer of the truth.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="goal-wrapper mb-30">
                <h3>OUR GOAL</h3>
                <p>
                  Handcraft provide how all this mistaken idea of denouncing
                  pleasure and sing pain was born an will give you a ete account
                  of the system, and expound the actual teangs of the eat
                  explorer of the truth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="choose-area pb-5">
        <div className="container">
          <div className="about-section">
            <h3>
              YOU CAN CHOOSE US BECAUSE <br />
              WE ALWAYS PROVIDE IMPORTANCE...
            </h3>
            <p>
              Handcraft provide how all this mistaken idea of denouncing
              pleasure and sing pain was born will give you a complete account
              of the system, and expound the actual{" "}
            </p>
          </div>
          <div className="row">
            <div className="col-lg-7 col-md-12">
              <div className="all-causes">
                <div className="row">
                  <div className="col-md-6 causes-res">
                    <div className="choose-wrapper">
                      <h4>FAST DELIVERY</h4>
                      <p>
                        Handcraft provide how all this mistaken dea of
                        denouncing pleasure and sing{" "}
                      </p>
                    </div>
                    <div className="choose-wrapper">
                      <h4>SECURE PAYMENT</h4>
                      <p>
                        Handcraft provide how all this mistaken dea of
                        denouncing pleasure and sing{" "}
                      </p>
                    </div>
                    <div className="choose-wrapper">
                      <h4>EASY ORDER TRACKING</h4>
                      <p>
                        Handcraft provide how all this mistaken dea of
                        denouncing pleasure and sing{" "}
                      </p>
                    </div>
                    <div className="choose-wrapper">
                      <h4>24/7 SUPPORT</h4>
                      <p>
                        Handcraft provide how all this mistaken dea of
                        denouncing pleasure and sing{" "}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="choose-wrapper">
                      <h4>QUALITY PRODUCT</h4>
                      <p>
                        Handcraft provide how all this mistaken dea of
                        denouncing pleasure and sing{" "}
                      </p>
                    </div>
                    <div className="choose-wrapper">
                      <h4>MONEY BACK GUARNTEE</h4>
                      <p>
                        Handcraft provide how all this mistaken dea of
                        denouncing pleasure and sing{" "}
                      </p>
                    </div>
                    <div className="choose-wrapper">
                      <h4>FREE RETURN</h4>
                      <p>
                        Handcraft provide how all this mistaken dea of
                        denouncing pleasure and sing{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="team-area">
        <img src="assets/img/banner/39.jpg" alt="" />
      </div>
      <div className="testimonials-area pt-5 pb-5 bg-img ">
        <div className="container">
          <div className="testimonials-active owl-carousel">
            <div className="single-testimonial-2 text-center">
              <img src={require("../Assets/Images/1.png")} alt="" />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation.
              </p>
              <img src={require("../Assets/Images/2.png")} alt="" />
              <h4>Mahammad Gulalov</h4>
              <span>Full-stack Developer</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
