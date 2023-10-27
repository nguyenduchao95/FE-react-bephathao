import React, {useContext, useState} from 'react';
import Description from "./Description";
import Review from "./Review";
import {ProductDetailContext} from "../ProductDetailPage";

const ProductLongDetail = () => {
    const [showDesc, setShowDesc] = useState(true);
    const {countReviews} = useContext(ProductDetailContext);
    return (
        <div className="row px-xl-5">
            <div className="col">
                <div className="nav nav-tabs justify-content-center border-bottom-gray mb-4">
                    <span className={`nav-item nav-link ${showDesc ? 'active' : ''}`}
                          onClick={() => setShowDesc(true)}>Mô tả - Thông số kĩ thuật</span>
                    <span className={`nav-item nav-link ${!showDesc ? 'active' : ''}`}
                          onClick={() => setShowDesc(false)}>Nhận xét ({countReviews})</span>
                </div>
                <div className="tab-content">
                    {showDesc ?
                        <Description/>
                        :
                        <Review/>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductLongDetail;