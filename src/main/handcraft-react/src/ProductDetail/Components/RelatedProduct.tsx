import React, { useEffect, useState } from "react";
import ProductModel from "../../Models/ProductModel";
import SearchItem from "../../SearchProduct/Components/SearchItem";
import { Carousel } from "react-responsive-carousel";

const RelatedProduct: React.FC<{ relatedProducts: ProductModel[] }> = (
  props
) => {
  return (
    <div className="product-area pb-95 mt-5">
      <div className="container">
        <div className="section-title-3 text-center mb-50">
          <h2 className="pb-4">Related products</h2>
        </div>
        <div className="product-style ">
          <div className="row">
            {props.relatedProducts.map((relatedProduct, index) => (
              <div className="col-lg-3">
              <SearchItem
              productId={relatedProduct.productId}
              product={relatedProduct}
              key={index}
              gridView={true}
              />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
