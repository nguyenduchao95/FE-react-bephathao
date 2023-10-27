import React from 'react';
import Images from "./Images";
import ProductInformation from "./ProductInformation";

const ProductShortDetail = () => {
    return (
        <div className="row px-xl-5">
            <div className="col-lg-5 me-5 pb-5">
                <Images/>
            </div>

            <div className="col-lg-6 ms-5 pb-5">
                <ProductInformation/>
            </div>
        </div>
    );
};

export default ProductShortDetail;