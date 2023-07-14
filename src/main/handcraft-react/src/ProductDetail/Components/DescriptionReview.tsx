import React from 'react'

const DescriptionReview:React.FC<{productDescription:string|undefined}> = (props) => {
  return (
    <>
    <div className="product-description-review-area pb-90">
            <div className="container">
                <div className="product-description-review text-center">
                    <div className="description-review-title nav" role="tablist">
                        <a className="active" href="#pro-dec" data-bs-toggle="tab" role="tab" aria-selected="true">
                            Description
                        </a>
                        <a href="#pro-review" data-bs-toggle="tab" role="tab" aria-selected="false">
                            Reviews (0)
                        </a>
                    </div>
                    <div className="description-review-text tab-content">
                        <div className="tab-pane active show fade" id="pro-dec" role="tabpanel">
                            <p>{props.productDescription}</p>
                        </div>
                        <div className="tab-pane fade" id="pro-review" role="tabpanel">
                            <a href="#">Be the first to write your review!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DescriptionReview