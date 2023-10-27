import React from 'react';

const Feature = () => {
    return (
        <div className="container-fluid pt-5">
            <div className="row px-xl-5 pb-3">
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex justify-content-center align-items-center border mb-4" style={{padding: '25px'}}>
                        <h1 className="bi bi-check-lg text-primary m-0 me-3"></h1>
                        <h6 className="font-weight-semi-bold m-0">Chất lượng sản phẩm</h6>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex justify-content-center align-items-center border mb-4" style={{padding: '25px'}}>
                        <h1 className="bi bi-truck text-primary m-0 me-3"></h1>
                        <h6 className="font-weight-semi-bold m-0">Miễn phí vận chuyển</h6>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex justify-content-center align-items-center border mb-4" style={{padding: '25px'}}>
                        <h1 className="bi bi-arrow-left-right text-primary m-0 me-3"></h1>
                        <h6 className="font-weight-semi-bold m-0">Đổi trả</h6>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex justify-content-center align-items-center border mb-4" style={{padding: '25px'}}>
                        <h1 className="bi bi-telephone-inbound text-primary m-0 me-3"></h1>
                        <h6 className="font-weight-semi-bold m-0">Hỗ trợ 24/7</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feature;