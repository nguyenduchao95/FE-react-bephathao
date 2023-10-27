import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {ShopContext} from "../../../context-reducer/context/ShopContext";

const Sidebar = () => {

    const {account} = useContext(ShopContext);

    return (
        <div className="col-3 bg-light border-end py-3">
            <aside style={{height: '80vh'}}>
                <nav className="list-group row">
                    <ul className="fw-medium">
                        <li className="px-3 py-2">
                            <NavLink to="/tai-khoan/thong-tin"
                                     className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                <i className="bi bi-info-circle me-2"></i>
                                Thông tin cá nhân
                            </NavLink>
                        </li>
                        <li className="px-3 py-2">
                            <NavLink to="/tai-khoan/doi-mat-khau"
                                     className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                <i className="bi bi-arrow-counterclockwise me-2"></i>
                                Đổi mật khẩu
                            </NavLink>
                        </li>

                        <li className="px-3 py-2">
                            <NavLink to="/tai-khoan/lich-su-mua-hang"
                                     className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                <i className="bi bi-clock-history me-2"></i>
                                Lịch sử mua hàng
                            </NavLink>
                        </li>

                        <li className="px-3 py-2">
                            <NavLink to="/tai-khoan/quan-ly-san-pham"
                                     className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                <i className="bi bi-clock-history me-2"></i>
                                Quản lý sản phẩm
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;