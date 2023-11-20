import React, {useContext, useEffect, useState} from 'react';
import _ from "lodash";
import {Pagination, Tooltip} from "@mui/material";
import {getAllOrdersByAccountId, getOrderDetailByOrdersId} from "../../../service/accountService";
import {ShopContext} from "../../../context-reducer/context/ShopContext";
import {formatCurrency, formatDate} from "../../../service/format";
import {Button, Modal} from "react-bootstrap";
import {changeStatusOrder, getAllOrders} from "../../../service/adminService";
import Swal from "sweetalert2";

const PurchaseHistory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({});
    const [orderDetail, setOrderDetail] = useState([]);
    const [status, setStatus] = useState("");
    const [name, setName] = useState("");
    const [nameSearch, setNameSearch] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [render, setRender] = useState(false);
    const {account} = useContext(ShopContext);

    useEffect(() => {
        const data = {status, name, startDate, endDate, nameSearch};
        if (account.role.name === "ROLE_USER") {
            getAllOrdersByAccountId(account.id, currentPage - 1, 10, data)
                .then(response => {
                    setOrders(response.data.content);
                    setTotalPages(response.data.totalPages);
                }).catch(error => {
                console.log(error);
            })
        } else if (account.role.name === "ROLE_ADMIN") {
            getAllOrders(data, currentPage - 1, 10)
                .then(response => {
                    setOrders(response.data.content);
                    setTotalPages(response.data.totalPages);
                }).catch(error => {
                console.log(error);
            })
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [status, name, nameSearch, startDate, endDate, currentPage, account, render])

    useEffect(() => {
        if (order.id) {
            getOrderDetailByOrdersId(order.id).then(response => {
                setOrderDetail(response.data);
            }).catch(error => {
                console.log(error);
            })
        }
    }, [order])
    const changePage = (event, value) => {
        setCurrentPage(value)
    }

    const handleChangeNameBill = (event) => {
        setName(event.target.value);
        setCurrentPage(1);
    }

    const handleChangeNameSearch = (event) => {
        setNameSearch(event.target.value);
        setCurrentPage(1);
    }

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
        setCurrentPage(1);
    }

    const handleChangeStartDate = (event) => {
        setStartDate(event.target.value);
        setCurrentPage(1);
    }

    const handleChangeEndDate = (event) => {
        setEndDate(event.target.value);
        setCurrentPage(1);
    }

    const handleOrderDetail = (item) => {
        setShowModal(true);
        setOrder(item);
    }

    const handleChangeStatusOrder = (item, newStatus) => {
        let title;
        if (item.status === 'Chờ xác nhận' && newStatus === 'Đang giao'){
            item.status = newStatus;
            title = 'Bạn chắc chắn muốn xác nhận đơn ?';
        } else if (item.status === 'Chờ xác nhận' && newStatus === 'Đã hủy'){
            item.status = newStatus;
            title = 'Bạn chắc chắn muốn hủy đơn ?';
        } else if (item.status === 'Đang giao' && newStatus === 'Đã giao'){
            item.status = newStatus;
            title = 'Bạn chắc chắn muốn xác nhận đã giao đơn ?';
        }
        Swal.fire({
            title: title,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng'
        }).then((result) => {
            if (result.isConfirmed) {
                changeStatusOrder(item).then(response => {
                    Swal.fire({
                        title: 'Thay đổi trạng thái thành công !',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then();
                    setRender(!render);
                }).catch(error => {
                    console.log(error);
                    Swal.fire({
                        title: 'Thay đổi trạng thái thất bại !',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    }).then();
                })
            }
        })
    }

    return (
        <div className="col-12 col-lg-9">
            <div className="container-fluid">
                <h2 className="text-uppercase text-center mb-5">
                    {account.role?.name === "ROLE_USER" ? 'Lịch sử mua hàng' : 'Lịch sử bán hàng'}
                </h2>
                <div className="mb-3 py-4 px-3 bg-gray row gx-2">
                    <div className="col-md-2 mb-3">
                        <div className="text-center mb-2 fw-medium">Trạng thái</div>
                        <select className="form-select py-2 border-0"
                                onChange={handleChangeStatus}>
                            <option value="">Tất cả</option>
                            <option value="Chờ xác nhận">Chờ xác nhận</option>
                            <option value="Đang giao">Đang giao</option>
                            <option value="Đã giao">Đã giao</option>
                            <option value="Đã hủy">Đã hủy</option>
                        </select>
                    </div>

                    <div className={`mb-3 ${account.role?.name === 'ROLE_USER' ? 'col-md-6' : 'col-md-3'}`}>
                        <div className="text-center mb-2 fw-medium">Tìm kiếm theo mã đơn</div>
                        <input type="text" className="form-control border-0 py-2"
                               placeholder="Nhập từ khóa tìm kiếm"
                               onChange={handleChangeNameBill}/>
                    </div>

                    {account.role?.name === 'ROLE_ADMIN' &&
                        <div className="col-md-3 mb-3">
                            <div className="text-center mb-2 fw-medium">Tìm kiếm theo người mua</div>
                            <input type="text" className="form-control border-0 py-2"
                                   placeholder="Nhập từ khóa tìm kiếm"
                                   onChange={handleChangeNameSearch}/>
                        </div>
                    }

                    <div className="col-6 col-md-2 mb-3">
                        <div className="text-center mb-2 fw-medium">Ngày bắt đầu</div>
                        <input type="date" className="form-control border-0 py-2"
                               onChange={handleChangeStartDate}/>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <div className="text-center mb-2 fw-medium">Ngày kết thúc</div>
                        <input type="date" className="form-control border-0 py-2"
                               onChange={handleChangeEndDate}/>
                    </div>
                </div>

                <div style={{minHeight: '500px', overflowX: 'auto'}}>
                    <table className="table table-custom">
                        <thead>
                        <tr align="center">
                            <th>STT</th>
                            <th>Mã đơn</th>
                            <th className="d-none d-sm-table-cell">Ngày mua</th>
                            <th className="d-none d-md-table-cell">Tổng tiền</th>
                            <th className="d-none d-md-table-cell">Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {!_.isEmpty(orders) ? orders.map((item, index) => {
                                return (
                                    <tr key={item.id} align="center">
                                        <td>
                                            <h6 className="m-0">{index + 1}</h6>
                                        </td>
                                        <td>{item.code}</td>
                                        <td className="d-none d-sm-table-cell">
                                            {formatDate(item.createdAt)}
                                        </td>
                                        <td className="d-none d-md-table-cell">
                                            {formatCurrency(item.totalPrice)}
                                        </td>
                                        <td className="d-none d-md-table-cell">
                                            {item.status}
                                        </td>
                                        <td>
                                            {item.status === 'Chờ xác nhận' ?
                                                <>
                                                    <button className="btn border-success text-success me-2 d-none d-md-inline-block"
                                                            onClick={() => handleChangeStatusOrder(item, 'Đang giao')}>
                                                        Xác nhận
                                                    </button>
                                                    <span className="text-success pointer d-inline d-md-none fs-3 me-3">
                                                        <Tooltip title="Xác nhận đơn" enterTouchDelay={0} arrow
                                                                 onClick={() => handleChangeStatusOrder(item, 'Đang giao')}>
                                                            <i className="bi bi-check-circle"></i>
                                                        </Tooltip>
                                                    </span>
                                                    <button className="btn border-danger text-danger me-2 d-none d-md-inline-block"
                                                            onClick={() => handleChangeStatusOrder(item, 'Đã hủy')}>
                                                        Hủy đơn
                                                    </button>
                                                    <span className="text-danger pointer d-inline d-md-none fs-3 me-3">
                                                        <Tooltip title="Hủy đơn" enterTouchDelay={0} arrow
                                                                 onClick={() => handleChangeStatusOrder(item, 'Đang giao')}>
                                                            <i className="bi bi-x-circle"></i>
                                                        </Tooltip>
                                                    </span>
                                                </>
                                                :
                                                item.status === 'Đang giao' ?
                                                    <>
                                                        <button className="btn border-danger text-danger me-2 d-none d-md-inline-block"
                                                                onClick={() => handleChangeStatusOrder(item, 'Đã giao')}>
                                                            Đã giao
                                                        </button>
                                                        <span className="text-danger pointer d-inline d-md-none fs-3 me-3">
                                                            <Tooltip title="Đã giao thành công" enterTouchDelay={0} arrow
                                                                     onClick={() => handleChangeStatusOrder(item, 'Đã giao')}>
                                                                <i className="bi bi-h-circle"></i>
                                                            </Tooltip>
                                                        </span>
                                                    </>
                                                    :
                                                    null
                                            }
                                            <button className="btn border-primary text-primary d-none d-md-inline-block"
                                                    onClick={() => handleOrderDetail(item)}>
                                                Chi tiết
                                            </button>
                                            <span className="text-primary pointer d-inline d-md-none fs-3">
                                                <Tooltip title="Chi tiết" enterTouchDelay={0} arrow
                                                         onClick={() => handleOrderDetail(item)}>
                                                    <i className="bi bi-info-circle"></i>
                                                </Tooltip>
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr align="center">
                                <td colSpan="6" className="py-3 fs-5 text-danger">Danh sách trống</td>
                            </tr>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="container">
                {totalPages ?
                    <div className="mt-4 d-flex justify-content-center">
                            <Pagination count={totalPages} color="primary"
                                        size="large" onChange={changePage}/>
                    </div>
                    :
                    null
                }
            </div>

            {!_.isEmpty(order) &&
                <Modal
                    show={showModal}
                    centered={true}
                    onHide={() => setShowModal(false)}
                    size="lg">
                    <Modal.Header closeButton>
                        <h2 className="text-uppercase m-0">
                            Chi tiết đơn hàng
                        </h2>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row px-3">
                            <p className="mb-1 col-lg-6 col-12 py-1 border-bottom">
                                <span className="fw-medium">Mã đơn: </span>{order.code}
                            </p>
                            <p className="mb-1 col-lg-6 col-12 py-1 border-bottom">
                                <span
                                    className="fw-medium">Ngày mua: </span>{order.createdAt && formatDate(order.createdAt)}
                            </p>
                            <p className="mb-1 col-lg-6 col-12 py-1 border-bottom">
                                <span className="fw-medium">Người mua: </span>{order.customer}
                            </p>
                            <p className="mb-1 col-lg-6 col-12 py-1 border-bottom">
                                <span className="fw-medium">Số điện thoại: </span>{order.phoneNumber}
                            </p>
                            <p className="mb-1 col-lg-6 col-12 py-1 border-bottom">
                                <span className="fw-medium">Tổng sản phẩm: </span>{order.quantityProduct}
                            </p>
                            <p className="mb-1 col-lg-6 col-12 py-1 border-bottom">
                                <span className="fw-medium">Tổng tiền: </span>{formatCurrency(order.totalPrice)}
                            </p>
                            <p className="mb-1 col-lg-6 col-12 py-1 border-bottom">
                                <span className="fw-medium">Hình thức thanh toán: </span>{order.payment}
                            </p>
                            <p className="mb-1 col-lg-6 col-12 py-1 border-bottom">
                                <span className="fw-medium">Trạng thái: </span>{order.status}
                            </p>
                            <p className="mb-1 col-12 py-1 border-bottom">
                                <span className="fw-medium">Địa chỉ nhận hàng: </span>{order.address}
                            </p>
                            <p className="mb-1 col-12">
                                <span className="fw-medium">Danh sách sản phẩm đã mua:</span>
                            </p>
                            <div style={{minHeight: '200px', overflowX: 'auto'}}>
                                <table className="table table-custom">
                                    <thead>
                                    <tr align="center">
                                        <th>STT</th>
                                        <th>Sản phẩm</th>
                                        <th>Giá mua</th>
                                        <th>Số lượng</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {!_.isEmpty(orderDetail) && orderDetail.map((item, index) => {
                                        return (
                                            <tr key={item.id} align="center">
                                                <td>
                                                    <h6 className="m-0">{index + 1}</h6>
                                                </td>
                                                <td>{item.product?.name}</td>
                                                <td>{formatCurrency(item.purchasePrice)}</td>
                                                <td>{item.quantity}</td>
                                                <td>{formatCurrency(item.purchasePrice * item.quantity)}</td>
                                            </tr>
                                        )
                                    })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </div>
    );
};

export default PurchaseHistory;