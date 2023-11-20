import React from 'react';
import check_img from '../../../image/icons8-check.gif';
import delivery_img from '../../../image/icons8-delivery.gif';
import exchange_img from '../../../image/icons8-exchange.gif';
import phone_img from '../../../image/icons8-phone-message.gif';

const Feature = () => {
    return (
        <div className="container-fluid pt-5">
            <div className="row px-xl-5 pb-3">
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex justify-content-center align-items-center border mb-4" style={{padding: '25px'}}>
                        <img src={check_img} className="me-3" alt=""/>
                        <h6 className="font-weight-semi-bold m-0">Chất lượng sản phẩm</h6>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex justify-content-center align-items-center border mb-4" style={{padding: '25px'}}>
                        {/*<h1 className="bi bi-truck text-primary m-0 me-3"></h1>*/}
                        <img src={delivery_img} className="me-3" alt=""/>
                        <h6 className="font-weight-semi-bold m-0">Miễn phí vận chuyển</h6>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex justify-content-center align-items-center border mb-4" style={{padding: '25px'}}>
                        {/*<h1 className="bi bi-arrow-left-right text-primary m-0 me-3"></h1>*/}
                        <img src={exchange_img} className="me-3" alt=""/>
                        <h6 className="font-weight-semi-bold m-0">Đổi trả</h6>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex justify-content-center align-items-center border mb-4" style={{padding: '25px'}}>
                        {/*<h1 className="bi bi-telephone-inbound text-primary m-0 me-3"></h1>*/}
                        <img src={phone_img} className="me-3" alt=""/>
                        <h6 className="font-weight-semi-bold m-0">Hỗ trợ 24/7</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feature;