import React, {useContext, useState} from 'react';
import {NavLink} from "react-router-dom";
import {ShopContext} from "../../../context-reducer/context/ShopContext";
import _ from "lodash";
import menu_img from "../../../image/icons8-menu-36.png";
import {SwipeableDrawer} from "@mui/material";

const Sidebar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const {account} = useContext(ShopContext);

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setShowMenu(open);
    };

    const renderListMenu = () => {
      return (
          <ul className="fw-medium ps-2">
              <li className="px-3 py-2">
                  <NavLink to="/tai-khoan/thong-tin-tai-khoan" onClick={toggleDrawer(false)}
                           className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                      <i className="bi bi-info-circle me-2"></i>
                      Thông tin cá nhân
                  </NavLink>
              </li>
              <li className="px-3 py-2">
                  <NavLink to="/tai-khoan/doi-mat-khau" onClick={toggleDrawer(false)}
                           className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                      <i className="bi bi-arrow-counterclockwise me-2"></i>
                      Đổi mật khẩu
                  </NavLink>
              </li>

              {!_.isEmpty(account) && account.role.name === "ROLE_USER" &&
                  <li className="px-3 py-2">
                      <NavLink to="/tai-khoan/lich-su-mua-hang" onClick={toggleDrawer(false)}
                               className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                          <i className="bi bi-clock-history me-2"></i>
                          Lịch sử mua hàng
                      </NavLink>
                  </li>
              }

              {!_.isEmpty(account) && account.role.name === "ROLE_ADMIN" &&
                  <>
                      <li className="px-3 py-2">
                          <NavLink to="/tai-khoan/thong-tin-shop" onClick={toggleDrawer(false)}
                                   className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                              <i className="bi bi-house-gear me-2"></i>
                              Thông tin cửa hàng
                          </NavLink>
                      </li>

                      <li className="px-3 py-2">
                          <NavLink to="/tai-khoan/quan-ly-banner" onClick={toggleDrawer(false)}
                                   className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                              <i className="bi bi-images me-2"></i>
                              Quản lý banner
                          </NavLink>
                      </li>

                      <li className="px-3 py-2">
                          <NavLink to="/tai-khoan/quan-ly-tai-khoan" onClick={toggleDrawer(false)}
                                   className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                              <i className="bi bi-person-gear me-2"></i>
                              Quản lý tài khoản
                          </NavLink>
                      </li>

                      <li className="px-3 py-2">
                          <NavLink to="/tai-khoan/quan-ly-danh-gia" onClick={toggleDrawer(false)}
                                   className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                              <i className="bi bi-star me-2"></i>
                              Quản lý các đánh giá
                          </NavLink>
                      </li>

                      <li className="px-3 py-2">
                          <NavLink to="/tai-khoan/lich-su-ban-hang" onClick={toggleDrawer(false)}
                                   className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                              <i className="bi bi-clock-history me-2"></i>
                              Lịch sử bán hàng
                          </NavLink>
                      </li>

                      <li className="px-3 py-2">
                          <NavLink to="/tai-khoan/quan-ly-san-pham" onClick={toggleDrawer(false)}
                                   className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                              <i className="bi bi-card-checklist me-2"></i>
                              Quản lý sản phẩm
                          </NavLink>
                      </li>

                      <li className="px-3 py-2">
                          <NavLink to="/tai-khoan/quan-ly-bai-viet" onClick={toggleDrawer(false)}
                                   className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                              <i className="bi bi-postcard-heart me-2"></i>
                              Bài viết kinh nghiệm hay
                          </NavLink>
                      </li>

                      <li className="px-3 py-2">
                          <NavLink to="/tai-khoan/chinh-sach-va-ho-tro" onClick={toggleDrawer(false)}
                                   className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                              <i className="bi bi-gear-wide-connected me-2"></i>
                              Chính sách và hỗ trợ
                          </NavLink>
                      </li>
                  </>
              }
          </ul>
      )
    }

    return (
        <>
            <div className="col-3 bg-light border py-3 d-none d-lg-block sidebar">
                <aside>
                    <nav className="list-group row">
                        {renderListMenu()}
                    </nav>
                </aside>
            </div>
            <div className="d-block d-lg-none mb-3">
                <button className="btn border-secondary fs-5" onClick={toggleDrawer(true)}>
                    <img src={menu_img} alt=""/>
                </button>

                <SwipeableDrawer
                    anchor="left"
                    open={showMenu}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    <div className="py-4">
                    {renderListMenu()}
                    </div>
                </SwipeableDrawer>
            </div>
        </>
    );
};

export default Sidebar;