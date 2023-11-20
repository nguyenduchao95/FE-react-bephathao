import React, {useEffect, useState} from 'react';
import {Button, Modal, Table} from "react-bootstrap";
import _ from "lodash";
import Swal from "sweetalert2";
import image_user from "../../../image/user-image.png";
import {Pagination, Tooltip} from "@mui/material";
import {blockAccount, getAllAccounts, unBlockAccount} from "../../../service/adminService";
import {getAllOrdersByAccountId} from "../../../service/accountService";
import {formatDate} from "../../../service/format";

const AccountsManager = () => {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState([]);
    const [nameSearch, setNameSearch] = useState("");
    const [status, setStatus] = useState("");
    const [render, setRender] = useState(false);
    const [user, setUser] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const data = {status, nameSearch}
        getAllAccounts(data, currentPage - 1).then(response => {
            setUsers(response.data.content);
            setTotalPages(response.data.totalPages);
        }).catch(error => console.log(error));
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [currentPage, nameSearch, status, render])

    useEffect(() => {
        if (user.id) {
            getAllOrdersByAccountId(user.id, 0, 5, {}).then(response => {
                setTotalOrders(response.data.totalElements);
            }).catch(error => console.log(error));
        }
    }, [user])

    const showUserDetail = (user) => {
        setUser({...user});
        setShowModal(true);
    }

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
        setCurrentPage(1);
    }

    const handleChangeNameSearch = (event) => {
        setNameSearch(event.target.value);
        setCurrentPage(1);
    }

    const changePage = (e, value) => {
        setCurrentPage(value);
    }

    const handleBlockAccount = (id) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn khóa tài khoản này?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                blockAccount(id).then(() => {
                    setRender(!render);
                    Swal.fire({
                        icon: 'success',
                        title: 'Khóa tài khoản thành công !',
                        showConfirmButton: false,
                        timer: 1000
                    }).then();
                    /*sendNotify({
                        content: "Admin đã khóa tài khoản của bạn",
                        receiver: {id}
                    });*/
                }).catch(error => {
                    console.log(error);
                });
            }
        })
    }
    const handleUnBlockAccount = (id) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn mở khóa tài khoản này?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                unBlockAccount(id).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Mở khóa tài khoản thành công !',
                        showConfirmButton: false,
                        timer: 1000
                    }).then();
                    setRender(!render);
                }).catch(error => {
                    console.log(error);
                });
            }
        })
    }

    return (
        <div className="col-12 col-lg-9">
            <h2 className="text-uppercase text-center mb-5">Danh sách người dùng</h2>
            <div className="mb-3 py-4 px-3"
                 style={{backgroundColor: "rgb(220,219,219)"}}>
                <div className={'row g-2'}>
                    <div className="col-md-4">
                        <label className="form-label fw-medium">Trạng thái</label>
                        <select className="form-select py-2 border-0"
                                onChange={handleChangeStatus}>
                            <option value="">Tất cả</option>
                            <option value="Đang hoạt động">Đang hoạt động</option>
                            <option value="Bị khóa">Bị khóa</option>
                        </select>
                    </div>
                    <div className="col-md-8">
                        <label className="form-label fw-medium">Tìm kiếm theo tên đăng nhập</label>
                        <input type="text" className="form-control border-0 py-2"
                               placeholder="Nhập từ khóa tìm kiếm"
                               value={nameSearch}
                               onChange={handleChangeNameSearch}/>
                    < /div>
                </div>
            </div>
            <div style={{minHeight: '500px', overflowX: 'auto'}}>
                <Table hover className="table-custom">
                    <thead>
                    <tr align="center">
                        <th>STT</th>
                        <th>Tên đăng nhập</th>
                        <th className="d-none d-md-table-cell">Vai trò</th>
                        <th className="d-none d-md-table-cell">Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!_.isEmpty(users) ?
                        users.map((item, index) => (
                            <tr key={item.id} align="center">
                                <td>{index + 1}</td>
                                <td>{item.username}</td>
                                <td className="d-none d-md-table-cell">{item.role.name === "ROLE_ADMIN" ? "Admin" : "Người dùng"}</td>
                                <td className="d-none d-md-table-cell">{item.status}</td>
                                <td className="d-flex justify-content-center">
                                    <button
                                        onClick={() => {
                                            showUserDetail(item)
                                        }}
                                        className="btn border border-primary text-primary d-none d-md-block"
                                        style={{width: '100px'}}>
                                        Chi tiết
                                    </button>
                                    <span className="text-primary d-inline d-md-none fs-3">
                                        <Tooltip title="Chi tiết" enterTouchDelay={0} arrow
                                                 onClick={() => showUserDetail(item)}>
                                            <i className="bi bi-info-circle"></i>
                                        </Tooltip>
                                    </span>
                                    {item.status === "Bị khóa" && item.role.name === "ROLE_USER" ?
                                        <>
                                            <button
                                                onClick={() => handleUnBlockAccount(item.id)}
                                                className="btn border border-danger text-danger d-none d-md-block ms-3"
                                                style={{width: '100px'}}>
                                                Mở khóa
                                            </button>
                                            <span className="text-danger d-inline d-md-none fs-3 ms-3">
                                                    <Tooltip title="Mở khóa tài khoản" enterTouchDelay={0} arrow
                                                             onClick={() => handleUnBlockAccount(item.id)}>
                                                        <i className="bi bi-unlock"></i>
                                                    </Tooltip>
                                                </span>
                                        </>
                                        :
                                        item.role.name === "ROLE_USER" ?
                                            <>
                                                <button
                                                    onClick={() => handleBlockAccount(item.id)}
                                                    className="btn border border-secondary text-secondary d-none d-md-block ms-3"
                                                    style={{width: '100px'}}>
                                                    Khóa
                                                </button>
                                                <span className="text-danger d-inline d-md-none fs-3 ms-3">
                                                    <Tooltip title="Khóa tài khoản" enterTouchDelay={0} arrow
                                                             onClick={() => handleBlockAccount(item.id)}>
                                                        <i className="bi bi-ban"></i>
                                                    </Tooltip>
                                                </span>
                                            </>
                                            :
                                            null
                                    }
                                </td>
                            </tr>
                        ))
                        :
                        <tr align="center">
                            <td colSpan="6" className="py-3 fs-5 text-danger">Danh sách trống</td>
                        </tr>
                    }
                    </tbody>
                    {!_.isEmpty(user) &&
                        <Modal
                            size="xl"
                            show={showModal}
                            onHide={() => setShowModal(false)}
                            className="p-0"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">
                                    Chi tiết người dùng
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
                                        <img className="img-fluid" src={user.avatar ? user.avatar : image_user} alt=""
                                             width={200}/>
                                    </div>
                                    <div className="col-12 col-md-7">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item py-3">
                                                <span className="mb-2 fw-medium">Tên đăng nhập:</span> {user.username}
                                            </li>
                                            <li className="list-group-item py-3">
                                            <span
                                                className="mb-2 fw-medium">Họ và tên:</span> {user.lastName ? `${user.lastName} ${user.firstName}` : 'Chưa có thông tin'}
                                            </li>
                                            <li className="list-group-item py-3">
                                            <span
                                                className="mb-2 fw-medium">Ngày sinh:</span> {user.dateOfBirth ? formatDate(user.dateOfBirth) : 'Chưa có thông tin'}
                                            </li>
                                            <li className="list-group-item py-3">
                                            <span
                                                className="mb-2 fw-medium">Địa chỉ:</span> {user.address ? user.address : 'Chưa có thông tin'}
                                            </li>
                                            <li className="list-group-item py-3">
                                                <span className="mb-2 fw-medium">Email:</span> {user.email}
                                            </li>
                                            <li className="list-group-item py-3">
                                            <span
                                                className="mb-2 fw-medium">Số điện thoại:</span> {user.phoneNumber ? user.phoneNumber : 'Chưa có thông tin'}
                                            </li>
                                            <li className="list-group-item py-3">
                                            <span
                                                className="mb-2 fw-medium">Ngày đăng ký:</span> {formatDate(user.createdAt)}
                                            </li>
                                            <li className="list-group-item py-3">
                                            <span
                                                className="mb-2 fw-medium">Ngày cập nhật:</span> {user.updatedAt ? formatDate(user.updatedAt) : 'Chưa có thông tin'}
                                            </li>
                                            <li className="list-group-item py-3">
                                            <span
                                                className="mb-2 fw-medium">Trạng thái:</span> {user.status}
                                            </li>
                                            <li className="list-group-item py-3">
                                                <span
                                                    className="mb-2 fw-medium">Số đơn hàng đã mua:</span> {totalOrders}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" className="py-2 px-3"
                                        onClick={() => setShowModal(false)}>
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    }
                </Table>
            </div>
            {totalPages > 0 ?
                <div className="mt-4 d-flex justify-content-center">
                    <Pagination count={totalPages} color="primary"
                                size="large" onChange={changePage}/>
                </div>
                :
                null
            }
        </div>
    );
};

export default AccountsManager;