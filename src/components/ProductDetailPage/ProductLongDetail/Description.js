import React, {useContext} from 'react';
import {ProductDetailContext} from "../ProductDetailPage";

const Description = (props) => {
    const {product} = useContext(ProductDetailContext);
    return (
        <div className="row product-description" style={{textAlign: 'justify'}}>
            <div className="col-lg-8 col-md-8 col-12">
                <h4 className="mb-3">Mô tả sản phẩm:</h4>
                <div dangerouslySetInnerHTML={{__html: product.description}}></div>
            </div>
            <div className="col-lg-4 col-md-4 col-12">
                <h4 className="mb-3">Thông số kĩ thuật:</h4>
                <div dangerouslySetInnerHTML={{__html: product.technicalInformation}}></div>
            </div>
        </div>
    );
};

export default Description;