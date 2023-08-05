import React from 'react'
import ReviewModel from '../../Models/ReviewModel'
import StarRating from '../../Utils/StarRating'

const DescriptionReview:React.FC<{productDescription:string|undefined, reviews:ReviewModel[]}> = (props) => {
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
                            Reviews ({props.reviews?.length})
                        </a>
                    </div>
                    <div className="description-review-text tab-content">
                        <div className="tab-pane active show fade" id="pro-dec" role="tabpanel">
                            <p>{props.productDescription}</p>
                        </div>
                        <div className="tab-pane fade" id="pro-review" role="tabpanel">
                            {props.reviews?.length === 0 ? 
                            <p >Review Box is empty!!</p>
                            : <></>}
                             
                            <ul>
                            {props.reviews?.map((review:ReviewModel,index:number)=>(
                                <li className='review-item my-2' key={index}>
                                    <h5 className='review-email'>{review.userEmail}</h5>
                                    <br />
                                    <p className='review-body'>{review.reviewBody}</p>
                                    <div className='d-flex justify-content-center align-items-center justify-content-around'>
                                    <StarRating rating={review.ranking} size={16}/>
                                    <span className='px-1 mt-1'>{review.createdAt.slice(0,10)}</span>
                                    </div>
                                </li>
                            ))}
                            </ul>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DescriptionReview