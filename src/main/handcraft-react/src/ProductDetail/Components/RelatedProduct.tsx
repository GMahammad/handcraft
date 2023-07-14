import React from 'react'

const RelatedProduct = () => {
  return (
    <div className="product-area pb-95 mt-5">
            <div className="container">
                <div className="section-title-3 text-center mb-50">
                    <h2 className='pb-4'>Related products</h2>
                </div>
                <div className="product-style ">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="product-img">
                                <a href="#">
                                    <img src={require("../../Assets/Images/5.jpg")} alt=""/>
                                </a>
                            </div>
                            <div className="product-content">
                                <h4><a href="#">Arifo Stylas Dress</a></h4>
                                <span>$115.00</span>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="product-img">
                                <a href="#">
                                    <img src={require("../../Assets/Images/6.jpg")} alt=""/>
                                </a>
                            </div>
                            <div className="product-content">
                                <h4><a href="#">Arifo Stylas Dress</a></h4>
                                <span>$115.00</span>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="product-img">
                                <a href="#">
                                    <img src={require("../../Assets/Images/7.jpg")} alt=""/>
                                </a>
                               
                            </div>
                            <div className="product-content">
                                <h4><a href="#">Arifo Stylas Dress</a></h4>
                                <span>$115.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default RelatedProduct