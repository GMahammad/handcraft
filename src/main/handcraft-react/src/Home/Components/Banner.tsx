
const Banner = () => {
  return (
    <>
    <div className="banner-area pt-180 pb-180 mt-5">
    <div className="container">
        <div className="row">
            <div className="ms-auto col-lg-5">
                <div className="offer-img">
                    <img src={require('../../Assets/Images/3.png')} alt=""/>
                    <div className="offer-text">
                        <h3>Discount Product for Summer</h3>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="offer-details-wrapper">
                    <h2>New Arrival Handmade Pot</h2>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                    <div className="offer-price-btn">
                        <div className="offer-price">
                            <span className="offer-old-price">$69.10</span>
                            <span className="offer-new-price">$59.00</span>
                        </div>
                        <div className="offer-btn">
                            <a href="product-details.html">Shop Now  →</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default Banner