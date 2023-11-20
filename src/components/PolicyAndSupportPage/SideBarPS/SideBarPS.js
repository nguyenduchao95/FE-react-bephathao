import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

const SideBarPs = () => {
    const [support, setSupport] = useState(true);
    const [policy, setPolicy] = useState(true);
    return (
        <div className="col-3 bg-light border py-3 d-none d-lg-block">
            <aside>
                <nav className="list-group row">
                    <div className="nav-link px-4 py-2 d-flex justify-content-between" onClick={() => setSupport(!support)}>
                        Hỗ trợ khách hàng
                        <i className={`bi bi-caret-${support ? 'down' : 'right'}`}></i>
                    </div>
                    {support &&
                        <ul>
                            <li className="px-3 py-1">
                                <NavLink to="/kinh-nghiem-hay"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="bi bi-dash-lg me-2"></i>
                                    Kinh nghiệm hay
                                </NavLink>
                            </li>
                            <li className="px-3 py-1">
                                <NavLink to="/chinh-sach-va-ho-tro/huong-dan-mua-hang-online"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="bi bi-dash-lg me-2"></i>
                                    Hướng dẫn mua hàng online
                                </NavLink>
                            </li>
                            <li className="px-3 py-1">
                                <NavLink to="/chinh-sach-va-ho-tro/quy-dinh-chung"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="bi bi-dash-lg me-2"></i>
                                    Quy định chung
                                </NavLink>
                            </li>
                            <li className="px-3 py-1">
                                <NavLink to="/chinh-sach-va-ho-tro/bao-mat-thong-tin"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="bi bi-dash-lg me-2"></i>
                                    Bảo mật thông tin
                                </NavLink>
                            </li>
                        </ul>
                    }

                    <div className="nav-link px-4 py-2 d-flex justify-content-between" onClick={() => setPolicy(!policy)}>
                        Chính sách mua hàng
                        <i className={`bi bi-caret-${policy ? 'down' : 'right'}`}></i>
                    </div>
                    {policy &&
                        <ul>
                            <li className="px-3 py-1">
                                <NavLink to="/chinh-sach-va-ho-tro/dich-vu-sua-chua"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="bi bi-dash-lg me-2"></i>
                                    Dịch vụ sửa chữa
                                </NavLink>
                            </li>
                            <li className="px-3 py-1">
                                <NavLink to="/chinh-sach-va-ho-tro/giao-hang-va-lap-dat"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="bi bi-dash-lg me-2"></i>
                                    Giao hàng và lắp đặt
                                </NavLink>
                            </li>
                            <li className="px-3 py-1">
                                <NavLink to="/chinh-sach-va-ho-tro/quyen-loi-sau-mua-hang"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="bi bi-dash-lg me-2"></i>
                                    Quyền lợi sau mua hàng
                                </NavLink>
                            </li>
                            <li className="px-3 py-1">
                                <NavLink to="/chinh-sach-va-ho-tro/bao-hanh-va-doi-san-pham"
                                         className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                                    <i className="bi bi-dash-lg me-2"></i>
                                    Bảo hành và đổi sản phẩm
                                </NavLink>
                            </li>
                        </ul>
                    }
                </nav>
            </aside>
        </div>
    );
};

export default SideBarPs;