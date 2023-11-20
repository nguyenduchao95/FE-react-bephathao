import React, {useContext, useEffect, useState} from 'react';
import logo from "../../../image/logo-bep-ha-thao.png";
import {getAllCategories} from "../../../service/categoryService";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {Modal} from "react-bootstrap";
import Login from "../../LoginPage/Login";
import {ShopContext} from "../../../context-reducer/context/ShopContext";
import _ from 'lodash';
import icon_user from '../../../image/icons8-user-40.png';
import {deleteAccount} from "../../../context-reducer/actions/actions";
import Register from "../../RegisterPage/Register";
import Swal from "sweetalert2";
import {SwipeableDrawer} from "@mui/material";
import menu_img from "../../../image/icons8-menu-45.png";

const NavBar = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [showNav, setShowNav] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const {account, dispatch} = useContext(ShopContext);
    const navigate = useNavigate();

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => {
        setShowModal(true);
        setShowLogin(true);
        setShowNav(false);
    }

    const handleLogout = () => {
        localStorage.removeItem("account-bephathao");
        dispatch(deleteAccount());
        navigate("/");
        Swal.fire({
            icon: 'success',
            title: 'Đăng xuất thành công!',
            showConfirmButton: false,
            timer: 1500
        }).then();
        setShowNav(false);
    }

    useEffect(() => {
        getAllCategories().then(response => {
            setCategories(response.data);
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        if (open) setShowProfile(false);

        setShowNav(open);
    };
    return (
        <div className="container-fluid mb-5 sticky-top bg-gray nav-bar">
            <div className="row px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                    <div className="dropdown">
                        <button
                            className="btn dropdown-toggle shadow-none d-flex align-items-center bg-shop text-white w-100"
                            data-bs-toggle="dropdown"
                            style={{height: '60px', padding: '0 30px'}}>
                            <i className="bi bi-list-ul me-3 fs-5"></i>
                            <h6 className="m-0">Danh mục</h6>
                        </button>
                        <ul className="dropdown-menu w-100 p-0 border border-top-0 border-bottom-0">
                            {categories && categories.map(category => (
                                <li key={category.id}>
                                    <Link to={`/san-pham/danh-muc/${category.id}`}
                                          className="nav-link border-bottom category-item dropdown-item">
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-lg-9">
                    <nav className="navbar-light h-100">
                        <div className="d-none d-lg-flex justify-content-between h-100">
                            <div className="d-flex align-items-center justify-content-between">
                                <NavLink to='/'
                                         className={({isActive}) => isActive ? 'nav-link px-3 active-text fw-medium' : 'nav-link px-3 fw-medium'}
                                >Trang chủ</NavLink>

                                <NavLink to='/san-pham'
                                         className={({isActive}) => isActive ? 'nav-link px-3 active-text fw-medium' : 'nav-link px-3 fw-medium'}
                                >Sản phẩm</NavLink>

                                <NavLink to='/gioi-thieu'
                                         className={({isActive}) => isActive ? 'nav-link px-3 active-text fw-medium' : 'nav-link px-3 fw-medium'}
                                >Giới thiệu</NavLink>

                                <NavLink to='/kinh-nghiem-hay'
                                         className={({isActive}) => isActive ? 'nav-link px-3 active-text fw-medium' : 'nav-link px-3 fw-medium'}
                                >Kinh nghiệm hay</NavLink>

                                <NavLink to='/lien-he'
                                         className={({isActive}) => isActive ? 'nav-link px-3 active-text fw-medium' : 'nav-link px-3 fw-medium'}
                                >Liên hệ</NavLink>
                            </div>
                            <div className="py-0 h-100 d-flex align-items-center">
                                {_.isEmpty(account) ?
                                    <div className="nav-link fw-medium d-flex align-items-center" onClick={handleShowModal}>
                                        <i className="bi bi-person-circle me-2"></i>
                                        Đăng nhập
                                    </div>
                                    :
                                    <div className="dropdown">
                                        <button className="nav-link dropdown-toggle fw-medium" type="button"
                                                data-bs-toggle="dropdown">
                                            <img className="img-thumbnail rounded-circle me-2"
                                                 src={account?.avatar ? account.avatar : icon_user}
                                                 alt="" width={40} style={{height: '40px'}}/>
                                            <span className="fs-5">{account.username}</span>
                                        </button>
                                        <ul className="dropdown-menu" style={{top: '50px'}}>
                                            <li className="py-2 ">
                                                <Link className="dropdown-item" to="/tai-khoan/thong-tin-tai-khoan">
                                                    <i className="bi bi-person-bounding-box me-2"></i>Trang cá nhân
                                                </Link>
                                            </li>
                                            <li className="py-2">
                                                <span className="dropdown-item" onClick={handleLogout}>
                                                    <i className="bi bi-power me-2"></i>Đăng xuất
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between d-lg-none">
                            <Link to='/' className="text-decoration-none d-block d-lg-none py-2">
                                <img src={logo} alt="logo"/>
                            </Link>
                            <button className="btn border-secondary" onClick={toggleDrawer(true)}>
                                <img src={menu_img} alt=""/>
                            </button>
                        </div>
                    </nav>

                    <SwipeableDrawer
                        anchor="right"
                        open={showNav}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                    >
                        <div className="py-4 px-3">
                            <NavLink to='/' onClick={toggleDrawer(false)}
                                     className={({isActive}) => isActive ? 'nav-link active-text fw-medium py-2' : 'nav-link fw-medium py-2'}
                            ><i className="bi bi-house-heart me-2"></i>Trang chủ</NavLink>

                            <NavLink to='/san-pham' onClick={toggleDrawer(false)}
                                     className={({isActive}) => isActive ? 'nav-link active-text fw-medium py-2' : 'nav-link fw-medium py-2'}
                            ><i className="bi bi-list-stars me-2"></i>Sản phẩm</NavLink>

                            <NavLink to='/gioi-thieu' onClick={toggleDrawer(false)}
                                     className={({isActive}) => isActive ? 'nav-link active-text fw-medium py-2' : 'nav-link fw-medium py-2'}
                            ><i className="bi bi-info-square me-2"></i>Giới thiệu</NavLink>

                            <NavLink to='/kinh-nghiem-hay' onClick={toggleDrawer(false)}
                                     className={({isActive}) => isActive ? 'nav-link active-text fw-medium py-2' : 'nav-link fw-medium py-2'}
                            ><i className="bi bi-bookmark-star me-2"></i>Kinh nghiệm hay</NavLink>

                            <NavLink to='/lien-he' onClick={toggleDrawer(false)}
                                     className={({isActive}) => isActive ? 'nav-link active-text fw-medium py-2' : 'nav-link fw-medium py-2'}
                            ><i className="bi bi-telephone-inbound me-2"></i>Liên hệ</NavLink>

                            <div className="border-top mt-3 pt-3">
                                {_.isEmpty(account) ?
                                    <span className="nav-link fw-medium" onClick={handleShowModal}>
                                    <i className="bi bi-person-circle me-2"></i>
                                    Đăng nhập
                                </span>
                                    :
                                    <div className="">
                                        <button className="nav-link fw-medium" type="button"
                                                onClick={() => setShowProfile(!showProfile)}>
                                            <img className="img-thumbnail rounded-circle me-2"
                                                 src={account?.avatar ? account.avatar : icon_user}
                                                 alt="" width={40} style={{height: '40px'}}/>
                                            <span className="fs-5">{account.username}</span>
                                        </button>
                                        {showProfile &&
                                            <ul className="ps-2 pt-2 mt-2 bg-light">
                                                <li className="py-2">
                                                    <Link className="dropdown-item fw-medium" to="/tai-khoan/thong-tin-tai-khoan"
                                                          onClick={toggleDrawer(false)}>
                                                        <i className="bi bi-person-square me-2"></i>Trang cá nhân
                                                    </Link>
                                                </li>
                                                <li className="py-2">
                                                    <span className="dropdown-item fw-medium" onClick={handleLogout}>
                                                        <i className="bi bi-power me-2"></i>Đăng xuất
                                                    </span>
                                                </li>
                                            </ul>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </SwipeableDrawer>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                {showLogin ?
                    <Login handleCloseModal={handleCloseModal} setShowLogin={setShowLogin}/>
                    :
                    <Register setShowLogin={setShowLogin}/>
                }
            </Modal>
        </div>
    );
};

export default NavBar;