import DescriptionReview from "./Components/DescriptionReview"
import Details from "./Components/Details"
import RelatedProduct from "./Components/RelatedProduct"

const ProductDetailPage = () => {

  const productId = window.location.pathname.split(":")[1];

  return (
    <>
        <Details productId = {productId}/>
    </>
  )
}

export default ProductDetailPage