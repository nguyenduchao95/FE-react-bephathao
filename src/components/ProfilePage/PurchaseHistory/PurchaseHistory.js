import React, {useContext, useEffect, useState} from 'react';
import _ from "lodash";
import {Pagination} from "@mui/material";
import {getAllOrdersByAccountId, getOrderDetailByOrdersId} from "../../../service/accountService";
import {ShopContext} from "../../../context-reducer/context/ShopContext";
import {formatCurrency, formatDate} from "../../../service/format";
import {Button, Modal} from "react-bootstrap";

const PurchaseHistory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({});
    const [orderDetail, setOrderDetail] = useState([]);
    const [status, setStatus] = useState("");
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const {account} = useContext(ShopContext);

    useEffect(() => {
        const data = {status, name, startDate, endDate};
        getAllOrdersByAccountId(account.id, currentPage - 1, 10, data)
            .then(response => {
                setOrders(response.data.content);
                setTotalPages(response.data.totalPages);
            }).catch(error => {
            console.log(error);
            })
    }, [status, name, startDate, endDate, currentPage, account])

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

    const handleOrderDetail = (item) => {
        setShowModal(true);
        setOrder(item);
    }

    const handleChangeNameSearch = (event) => {
        setName(event.target.value);
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

    return (
        <div className="col-9">
            <div className="container" style={{minHeight: '600px'}}>
                <h3 className="text-uppercase text-center mb-5">Lịch sử mua hàng</h3>
                <div className="mb-3 py-4 px-3 bg-gray row gx-2">
                    <div className="col-md-2">
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

                    <div className="col-md-6">
                        <div className="text-center mb-2 fw-medium">Tìm kiếm theo mã đơn</div>
                        <input type="text" className="form-control border-0 py-2"
                               placeholder="Nhập từ khóa tìm kiếm"
                               onChange={handleChangeNameSearch}/>
                    </div>
                    <div className="col-2">
                        <div className="text-center mb-2 fw-medium">Ngày bắt đầu</div>
                        <input type="date" className="form-control border-0 py-2"
                               onChange={handleChangeStartDate}/>
                    </div>
                    <div className="col-2">
                        <div className="text-center mb-2 fw-medium">Ngày kết thúc</div>
                        <input type="date" className="form-control border-0 py-2"
                               onChange={handleChangeEndDate}/>
                    </div>
                </div>

                <table className="table">
                    <thead>
                    <tr align="center" style={{fontSize: '20px'}}>
                        <th>STT</th>
                        <th>Mã đơn</th>
                        <th>Ngày mua</th>
                        <th>Tổng sản phẩm</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody style={{verticalAlign: 'middle'}}>
                    {!_.isEmpty(orders) ? orders.map((item, index) => {
                            return (
                                <tr key={item.id} align="center">
                                    <td>
                                        <h6 className="m-0">{index + 1}</h6>
                                    </td>
                                    <td>{item.code}</td>
                                    <td>{formatDate(item.createdAt)}</td>
                                    <td>{item.quantityProduct}</td>
                                    <td>{formatCurrency(item.totalPrice)}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button className="btn border-primary text-primary"
                                                onClick={() => handleOrderDetail(item)}>
                                            Chi tiết
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        <tr align="center">
                            <td colSpan="7" className="pt-3 fs-5 text-danger">Danh sách trống</td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
            <div className="container">
                {totalPages ?
                    <div className="col-12 mt-5 d-flex justify-content-center">
                        <Pagination count={totalPages} size="large" variant="outlined" shape="rounded"
                                    onChange={changePage} color="primary"/>
                    </div>
                    :
                    null
                }
            </div>

            {!_.isEmpty(order) &&
                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row px-3">
                            <p className="mb-1 col-6">
                                <span className="fw-medium">Mã đơn: </span>{order.code}
                            </p>
                            <p className="mb-1 col-6">
                                <span className="fw-medium">Ngày mua: </span>{formatDate(order.createdAt)}
                            </p>
                            <p className="mb-1 col-6">
                                <span className="fw-medium">Tổng sản phẩm: </span>{order.quantityProduct}
                            </p>
                            <p className="mb-1 col-6">
                                <span className="fw-medium">Tổng tiền: </span>{formatCurrency(order.totalPrice)}
                            </p>
                            <p className="mb-1 col-6">
                                <span className="fw-medium">Hình thức thanh toán: </span>{order.payment}
                            </p>
                            <p className="mb-1 col-6">
                                <span className="fw-medium">Trạng thái: </span>{order.status}
                            </p>
                            <p className="mb-1 col-12">
                                <span className="fw-medium">Địa chỉ nhận hàng: </span>{order.address}
                            </p>
                            <p className="mb-1 col-12 fw-medium">Danh sách sản phẩm đã mua: </p>
                            <table className="table">
                                <thead>
                                <tr align="center">
                                    <th>STT</th>
                                    <th>Sản phẩm</th>
                                    <th>Giá mua</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                                </thead>
                                <tbody style={{verticalAlign: 'middle'}}>
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