import React, {useEffect, useState} from 'react';
import _ from "lodash";
import {Link} from "react-router-dom";
import {formatDate} from "../../../service/format";
import {getAllPolicySupports} from "../../../service/policySupportService";
import Swal from "sweetalert2";
import {deletePolicySupport} from "../../../service/adminService";
import SavePolicySupport from "./CreateAndEditPolicySupport/SavePolicySupport";
import {Tooltip} from "@mui/material";

const PolicyAndSupportManager = () => {
    const [policySupports, setPolicySupports] = useState([]);
    const [policySupport, setPolicySupport] = useState({});
    const [render, setRender] = useState(false);
    const [showModalSavePolicySupport, setShowModalSavePolicySupport] = useState(false);

    useEffect(() => {
        getAllPolicySupports().then(response => {
            setPolicySupports(response.data);
        }).catch(error => {
            console.log(error);
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [render])

    const handleShowCreatePolicySupport = () => {
        setPolicySupport({
            title: "",
            content: ""
        })
        setShowModalSavePolicySupport(true);
    }

    const handleShowEditPolicySupport = (item) => {
        setPolicySupport({...item});
        setShowModalSavePolicySupport(true);
    }

    const handleDeletePolicySupport = (item) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn xóa bài viết này !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng'
        }).then((result) => {
            if (result.isConfirmed) {
                deletePolicySupport(item.id).then(response => {
                    Swal.fire({
                        title: 'Xóa bài viết thành công !',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then();
                    setRender(!render);
                }).catch(error => {
                    console.log(error);
                    Swal.fire({
                        title: 'Xóa bài viết thất bại !',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    }).then();
                });
            }
        })
    }

    const getRoute = (title) => {
      if (title === 'Hướng dẫn mua hàng online') return '/chinh-sach-va-ho-tro/huong-dan-mua-hang-online';
      if (title === 'Quy định chung') return '/chinh-sach-va-ho-tro/quy-dinh-chung';
      if (title === 'Bảo mật thông tin') return '/chinh-sach-va-ho-tro/bao-mat-thong-tin';
      if (title === 'Dịch vụ sửa chữa') return '/chinh-sach-va-ho-tro/dich-vu-sua-chua';
      if (title === 'Giao hàng và lắp đặt') return '/chinh-sach-va-ho-tro/giao-hang-va-lap-dat';
      if (title === 'Quyền lợi sau mua hàng') return '/chinh-sach-va-ho-tro/quy-dinh-chung';
      if (title === 'Bảo hành và đổi sản phẩm') return '/chinh-sach-va-ho-tro/bao-mat-thong-tin';
      if (title === 'Giới thiệu') return '/gioi-thieu';
    }
    return (
        <div className="col-12 col-lg-9">
            <h2 className="text-uppercase text-center mb-5">Chính sách và hỗ trợ</h2>

            <button className="btn btn-lg btn-primary mb-3 btn-add-product"
                    onClick={handleShowCreatePolicySupport}>
                Thêm mới bài viết
            </button>
            <div style={{minHeight: '500px', overflowX: 'auto'}}>
                <table className="table table-custom">
                    <thead>
                        <tr align="center" style={{fontSize: '18px'}}>
                            <th>STT</th>
                            <th>Tên bài viết</th>
                            <th className="d-none d-md-table-cell">Ngày đăng</th>
                            <th className="d-none d-md-table-cell">Ngày cập nhật</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    {!_.isEmpty(policySupports) ? policySupports.map((item, index) => {
                            return (
                                <tr key={item.id} align="center">
                                    <td>
                                        <span className="fw-medium">{index + 1}</span>
                                    </td>
                                    <td className="text-truncate text-start">
                                        <Link to={getRoute(item.title)}
                                              className="nav-link">
                                            <span className="text-truncate fs-6 fw-medium">
                                                {item.title}
                                            </span>
                                        </Link>
                                    </td>

                                    <td className="mb-3 d-none d-md-table-cell">
                                        <span>{formatDate(item.createdAt)}</span>
                                    </td>

                                    <td className="mb-3 d-none d-md-table-cell">
                                        <span>{formatDate(item.updatedAt)}</span>
                                    </td>

                                    <td className="mb-3">
                                        <button className="btn border-primary text-primary me-2 d-none d-md-inline"
                                                onClick={() => handleShowEditPolicySupport(item)}>
                                            Sửa bài
                                        </button>
                                        <span className="text-primary pointer d-inline d-md-none fs-3 me-4">
                                            <Tooltip title="Sửa bài viết" enterTouchDelay={0} arrow
                                                     onClick={() => handleShowEditPolicySupport(item)}>
                                                <i className="bi bi-pencil"></i>
                                            </Tooltip>
                                        </span>
                                        <button className="btn border-danger text-danger d-none d-md-inline"
                                                onClick={() => handleDeletePolicySupport(item)}>
                                            Xóa bài
                                        </button>
                                        <span className="text-danger pointer d-inline d-md-none fs-3">
                                            <Tooltip title="Xóa bài viết" enterTouchDelay={0} arrow
                                                     onClick={() => handleDeletePolicySupport(item)}>
                                                <i className="bi bi-trash"></i>
                                            </Tooltip>
                                        </span>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        <tr align="center">
                            <td colSpan="5" className="pt-3 fs-5 text-danger">Danh sách trống</td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>

            {!_.isEmpty(policySupport) &&
                <SavePolicySupport showModalSavePolicySupport={showModalSavePolicySupport}
                                   setShowModalSavePolicySupport={setShowModalSavePolicySupport}
                                   policySupport={policySupport} render={render} setRender={setRender}
                                   policySupports={policySupports}/>
            }
        </div>
    );
};

export default PolicyAndSupportManager;