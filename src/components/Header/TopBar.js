import React, {useContext, useEffect, useState} from 'react';
import logo from '../../image/logo-bep-ha-thao.png';
import {getAllInfo} from "../../service/informationService";
import {Link} from "react-router-dom";
import {ShopContext} from "../../context-reducer/context/ShopContext";

const TopBar = () => {
    const {carts} = useContext(ShopContext);
    const [information, setInformation] = useState({});
    useEffect(() => {
        getAllInfo().then((response) => {
            setInformation(response.data[0]);
        }).catch((error) => console.log(error))
    }, [])
    return (
        <div className="container-fluid">
            <div className="row bg-gray py-2 px-xl-5">
                <div className="col-lg-8 d-none d-lg-block">
                    <div className="d-inline-flex align-items-center" style={{fontSize: '14px'}}>
                        <span className="text-dark"><i
                            className="bi bi-telephone-fill me-2"></i>Liên hệ: {information.phoneNumber}</span>
                        <span className="text-muted px-2">|</span>
                        <span className="text-dark"><i
                            className="bi bi-envelope-fill me-2"></i>Email: {information.email}</span>
                        <span className="text-muted px-2">|</span>
                        <span className="text-dark"><i
                            className="bi bi-geo-alt-fill me-2"></i>Địa chỉ: {information.address}</span>
                    </div>
                </div>
                <div className="col-lg-4 text-center text-lg-end">
                    <div className="d-inline-flex align-items-center">
                        <a className="text-dark px-2" href="">
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="bi bi-twitter"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="bi bi-linkedin"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="bi bi-instagram"></i>
                        </a>
                        <a className="text-dark pl-2" href="">
                            <i className="bi bi-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row justify-content-between align-items-center py-3 px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                    <Link to="/" className="text-decoration-none">
                        <img src={logo} alt="logo"/>
                    </Link>
                </div>
                <div className="col-6">
                    <form action="">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Tìm kiếm sản phẩm..."/>
                            <div className="input-group-append">
                            <span className="input-group-text bg-transparent text-primary">
                                <i className="bi bi-search"></i>
                            </span>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-lg-3 col-md-4 col-6 text-end">
                    <Link to="/gio-hang" className="btn border position-relative">
                        <i className="bi bi-cart-fill me-2"></i>Giỏ hàng
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {carts.length}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TopBar;