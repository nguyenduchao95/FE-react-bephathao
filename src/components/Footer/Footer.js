import React, {useEffect, useState} from 'react';
import logo from "../../image/logo-bep-ha-thao.png";
import icon_zalo from "../../image/icons8-zalo-32.png";
import icon_fb from "../../image/icons8-facebook-32.png";
import {getAllInfo} from "../../service/informationService";

const Footer = () => {
    const [information, setInformation] = useState({});
    useEffect(() => {
        getAllInfo().then((response) => {
            setInformation(response.data[0]);
        }).catch((error) => console.log(error))
    }, [])


    return (
        <footer className="container-fluid bg-gray text-dark mt-3 pt-3">
            <div className="row px-xl-5 pt-5">
                <div className="col-lg-4 col-md-12 mb-5 pe-3 pe-xl-5">
                    <a href="" className="text-decoration-none">
                        <img src={logo} alt="logo"/>
                    </a>
                    <p className='mt-3'>Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no sit erat lorem et magna ipsum dolore amet erat.</p>
                    <p className="mb-2"><i className="bi bi-geo-alt-fill me-2"></i>{information.address}</p>
                    <p className="mb-2"><i className="bi bi-envelope-fill me-2"></i>{information.email}</p>
                    <p className="mb-0"><i className="bi bi-telephone-fill me-2"></i>{information.phoneNumber}</p>
                </div>
                <div className="col-lg-8 col-md-12">
                    <div className="row">
                        <div className="col-md-4 mb-5">
                            <h5 className="font-weight-bold text-dark mb-4">Hỗ trợ khách hàng</h5>
                            <div className="d-flex flex-column justify-content-start">
                                <a className="nav-link text-dark mb-2" href="index.html"><i className="fa fa-angle-right mr-2"></i>Kinh nghiệm hay</a>
                                <a className="nav-link text-dark mb-2" href="shop.html"><i className="fa fa-angle-right mr-2"></i>Hướng dẫn mua hàng online</a>
                                <a className="nav-link text-dark mb-2" href="detail.html"><i className="fa fa-angle-right mr-2"></i>Quy định chung</a>
                                <a className="nav-link text-dark mb-2" href="cart.html"><i className="fa fa-angle-right mr-2"></i>Bảo mật thông tin</a>
                            </div>
                        </div>
                        <div className="col-md-4 mb-5">
                            <h5 className="font-weight-bold text-dark mb-4">Chính sách mua hàng</h5>
                            <div className="d-flex flex-column justify-content-start">
                                <a className="nav-link text-dark mb-2" href="index.html"><i className="fa fa-angle-right mr-2"></i>Dịch vụ sửa chữa</a>
                                <a className="nav-link text-dark mb-2" href="shop.html"><i className="fa fa-angle-right mr-2"></i>Giao hàng và lắp đặt</a>
                                <a className="nav-link text-dark mb-2" href="detail.html"><i className="fa fa-angle-right mr-2"></i>Quyền lợi sau mua hàng</a>
                                <a className="nav-link text-dark mb-2" href="cart.html"><i className="fa fa-angle-right mr-2"></i>Bảo hành và đổi sản phẩm</a>
                            </div>
                        </div>
                        <div className="col-md-4 mb-5">
                            <h5 className="font-weight-bold text-dark mb-4">Kết nối với chúng tôi</h5>
                            <div className="d-flex flex-column justify-content-start">
                                <a className="nav-link text-dark mb-2" href="https://m.me/BepThaoHa"><img className='me-2' src={icon_fb} alt='icon-facebook'/>Facebook</a>
                                <a className="nav-link text-dark mb-2" href="https://zalo.me/0988068286"><img className='me-2' src={icon_zalo} alt='icon-zalo'/>Zalo</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row border-top border-light mx-xl-5 py-2">
                <div className="col-12">
                    <p className="mb-md-0 text-center text-md-left text-dark">
                        Copyright &copy;2023 Bản quyền thuộc về Bếp Hà Thảo
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;