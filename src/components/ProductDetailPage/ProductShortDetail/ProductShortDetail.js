import React from 'react';
import Images from "./Images";
import ProductInformation from "./ProductInformation";

const ProductShortDetail = () => {
    return (
        <div className="row px-xl-5">
            <div className="col-md-5 col-12 me-lg-5 pb-5">
                <Images/>
            </div>

            <div className="col-md-6 col-12 ms-md-5 pb-5">
                <ProductInformation/>
            </div>
        </div>
    );
};

export default ProductShortDetail;