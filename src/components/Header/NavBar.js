import React, {useContext, useEffect, useState} from 'react';
import logo from "../../image/logo-bep-ha-thao.png";
import {getAllCategories} from "../../service/categoryService";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {Modal} from "react-bootstrap";
import Login from "../LoginPage/Login";
import {ShopContext} from "../../context-reducer/context/ShopContext";
import _ from 'lodash';
import icon_user from '../../image/icons8-user-40.png';
import {deleteAccount} from "../../context-reducer/actions/actions";
import Register from "../RegisterPage/Register";
import Swal from "sweetalert2";

const NavBar = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const {account, dispatch} = useContext(ShopContext);
    const navigate = useNavigate();

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => {
        setShowModal(true);
        setShowLogin(true);
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
        }).then()
    }

    useEffect(() => {
        getAllCategories().then(response => {
            setCategories(response.data);
        }).catch(error => {
            console.log(error)
        })
    }, [])
    return (
        <div className="container-fluid mb-5 sticky-top bg-gray nav-bar">
            <div className="row border-top px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                    <div className="dropdown">
                        <button
                            className="btn dropdown-toggle shadow-none d-flex align-items-center bg-shop text-white w-100"
                            data-bs-toggle="dropdown"
                            style={{height: '60px', padding: '0 30px'}}>
                            <i className="bi bi-list-ul me-3 fs-5"></i>
                            <h6 className="m-0">Danh mục</h6>
                        </button>
                        <ul className="dropdown-menu w-100 navbar-light p-0 border border-top-0 border-bottom-0">
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
                    <nav className="navbar navbar-expand-md navbar-light py-3 py-lg-0 px-0 h-100">
                        <Link to='/' className="text-decoration-none d-block d-lg-none">
                            <img src={logo} alt="logo"/>
                        </Link>
                        <button type="button" className="navbar-toggler" data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto py-0">
                                <NavLink to='/'
                                         className={({isActive}) => isActive ? 'nav-link active-text fw-medium' : 'nav-link fw-medium'}
                                >Trang chủ</NavLink>

                                <NavLink to='/san-pham'
                                         className={({isActive}) => isActive ? 'nav-link active-text fw-medium' : 'nav-link fw-medium'}
                                >Sản phẩm</NavLink>

                                <NavLink to='/dich-vu'
                                         className={({isActive}) => isActive ? 'nav-link active-text fw-medium' : 'nav-link fw-medium'}
                                >Dịch vụ</NavLink>

                                <NavLink to='/kinh-nghiem-hay'
                                         className={({isActive}) => isActive ? 'nav-link active-text fw-medium' : 'nav-link fw-medium'}
                                >Kinh nghiệm hay</NavLink>

                                <NavLink to='/lien-he'
                                         className={({isActive}) => isActive ? 'nav-link active-text fw-medium' : 'nav-link fw-medium'}
                                >Liên hệ</NavLink>
                            </div>
                            <div className="navbar-nav py-0">
                                {_.isEmpty(account) ?
                                <span className="nav-link fw-medium" onClick={handleShowModal}>
                                    <i className="bi bi-person-circle me-2"></i>
                                    Đăng nhập
                                </span>
                                    :
                                    <div className="dropdown">
                                        <button className="nav-link dropdown-toggle fw-medium" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img className="img-thumbnail rounded-circle me-2" src={account?.avatar ? account.avatar : icon_user}
                                                 alt="" width={40} style={{height: '40px'}}/>
                                            <span className="fs-5">{account.username}</span>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li className="py-2 ">
                                                <Link className="dropdown-item" to="/tai-khoan/thong-tin">
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
                    </nav>
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