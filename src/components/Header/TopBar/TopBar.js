import React, {useContext, useEffect, useState} from 'react';
import logo from '../../../image/logo-bep-ha-thao.png';
import {getAllInfo} from "../../../service/informationService";
import {Link, useNavigate} from "react-router-dom";
import {ShopContext} from "../../../context-reducer/context/ShopContext";
import _ from 'lodash';
import icon_fb from "../../../image/icons8-facebook-25.png";
import icon_zalo from "../../../image/icons8-zalo-25.png";
import {filterProducts} from "../../../service/productService";
import {formatCurrency} from "../../../service/format";

const TopBar = () => {
    const {carts} = useContext(ShopContext);
    const [information, setInformation] = useState({});
    const [nameSearch, setNameSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getAllInfo().then((response) => {
            setInformation(response.data[0]);
        }).catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        const data = {nameSearch};
        if (nameSearch) {
            filterProducts(data, 0, 8).then(response => {
                setProducts(response.data.content);
                setTotalPages(response.data.totalPages);
            }).catch(error => {
                console.log(error);
            })
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }, [nameSearch])

    const handleChangeNameSearch = (event) => {
        setNameSearch(event.target.value);
    }

    const handleSearch = () => {
        setNameSearch("");
        navigate(`/tim-kiem?tu-khoa=${nameSearch}`);
    }

    const pressEnterToSearch = (event) => {
        if (event.key === 'Enter')
            handleSearch();
    }

    return (
        <div className="container-fluid top-bar">
            <div className="row bg-gray py-2 px-xl-5">
                <div className="col-lg-9 text-center text-lg-start">
                    {!_.isEmpty(information) &&
                        <div className="d-inline-flex align-items-center contact-custom" style={{fontSize: '14px'}}>
                            <span className="text-dark d-none d-sm-block">
                                <i className="bi bi-telephone-fill me-2"></i>
                                Liên hệ: <a href={`tel:${information.phoneNumber}`}
                                            className="contact-phone">{information.phoneNumber}</a>
                            </span>
                            <span className="text-muted px-2 d-none d-sm-block">
                                    |
                            </span>
                            <span className="text-dark d-none d-md-block">
                                <i className="bi bi-envelope-fill me-2"></i>
                                Email: <a href={`mailto:${information.email}`}
                                          className="contact-email">{information.email}</a>
                            </span>
                            <span className="text-muted px-2 d-none d-md-block">
                                    |
                            </span>
                            <span className="text-dark">
                                <i className="bi bi-geo-alt-fill me-2"></i>
                                Địa chỉ: {information.address}
                            </span>
                        </div>
                    }
                </div>
                <div className="col-lg-3 text-center text-lg-end d-none d-lg-block">
                    <div className="d-inline-flex align-items-center">
                        <a className="text-dark me-2 d-flex align-items-center" href="https://www.facebook.com/BepThaoHa" target="_blank">
                            <img src={icon_fb} alt=""/>
                        </a>
                        <a className="text-dark d-flex align-items-center" href="https://zalo.me/0988068286" target="_blank">
                            <img src={icon_zalo} alt=""/>
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
                <div className="col-md-6 col-7 d-flex align-items-center position-relative">
                    <input type="text" className="form-control border-secondary"
                           placeholder="Tìm kiếm sản phẩm..." value={nameSearch}
                           onChange={handleChangeNameSearch}
                           onKeyDown={pressEnterToSearch}/>
                    <span className="btn border-secondary text-primary ms-1"
                          onClick={handleSearch}>
                        <i className="bi bi-search"></i>
                    </span>
                    {nameSearch &&
                        <div className="container-search">
                            <div className="list-search">
                                {!_.isEmpty(products) ? products.map(item => (
                                        <Link to={`/san-pham/chi-tiet/${item.id}`} key={item.id}
                                              className="nav-link d-flex align-items-center mb-3"
                                              onClick={() => setNameSearch("")}>
                                            <img className="img-fluid border rounded d-none d-sm-block"
                                                 src={item.avatar} alt=""/>
                                            <div className="ps-sm-4 w-100">
                                                <div className="text-truncate fw-medium">
                                                    {item.name}
                                                </div>
                                                <div className="text-truncate">
                                                    <i className="bi bi-cash me-2"></i>
                                                    {formatCurrency(item.price - item.price * item.sale / 100)}
                                                    {item.sale ?
                                                        <del
                                                            className="ms-2 text-secondary">{formatCurrency(item.price)}</del>
                                                        :
                                                        null
                                                    }
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                    :
                                    <div className="text-center text-danger fs-6">
                                        Không tìm thấy sản phẩm
                                    </div>
                                }
                            </div>
                            {totalPages > 0 &&
                                <div className="text-center mt-2 fs-6" onClick={handleSearch}>
                                    <span className="nav-link text-danger">Xem thêm</span>
                                </div>
                            }
                        </div>
                    }
                </div>
                <div className="col-lg-3 col-md-4 col-5 text-end">
                    <Link to="/gio-hang" className="btn border position-relative">
                        <i className="bi bi-cart-fill me-2"></i>Giỏ hàng
                        <span
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {carts.length}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TopBar;