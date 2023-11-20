import React from 'react';
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="container-fluid text-center mb-5 pb-5">
            <div style={{fontSize: '100px'}}>
                <i className="bi bi-x-circle-fill me-4 text-danger"></i>
                404
            </div>
            <h1 className="mt-4">Trang hoặc địa chỉ không đúng !</h1>
            <Link to="/" className="btn btn-lg btn-primary mt-5 py-3">
                <i className="bi bi-house-heart-fill me-2"></i>
                Quay lại trang chủ
            </Link>
        </div>
    );
};

export default ErrorPage;