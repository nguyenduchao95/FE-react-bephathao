import React, {useEffect, useState} from 'react';
import _ from "lodash";
import {Pagination, Tooltip} from "@mui/material";
import {formatDate} from "../../../service/format";
import {Button, Modal} from "react-bootstrap";
import {
    confirmReview,
    deleteReview,
    getAllReviews
} from "../../../service/adminService";
import Swal from "sweetalert2";
import image_user from "../../../image/user-image.png";

const ReviewsManager = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState({});
    const [status, setStatus] = useState("");
    const [nameSearch, setNameSearch] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [render, setRender] = useState(false);

    useEffect(() => {
        const data = {status, startDate, endDate, nameSearch};
        getAllReviews(data, currentPage - 1, 10)
            .then(response => {
                setReviews(response.data.content);
                setTotalPages(response.data.totalPages);
            }).catch(error => {
            console.log(error);
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [status, nameSearch, startDate, endDate, currentPage, render])

    const changePage = (event, value) => {
        setCurrentPage(value);
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

    const handleReviewDetail = (item) => {
        setShowModal(true);
        setReview(item);
    }

    const handleConfirmReview = (item) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn phê duyệt đánh giá này',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng'
        }).then((result) => {
            if (result.isConfirmed) {
                confirmReview(item.id).then(response => {
                    Swal.fire({
                        title: 'Phê duyệt thành công !',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then();
                    setRender(!render);
                }).catch(error => {
                    console.log(error);
                    Swal.fire({
                        title: 'Phê duyệt thất bại !',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    }).then();
                })
            }
        })
    }

    const handleDeleteReview = (item) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn xóa đánh giá này',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteReview(item.id).then(response => {
                    Swal.fire({
                        title: 'Xóa đánh giá thành công !',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then();
                    setRender(!render);
                }).catch(error => {
                    console.log(error);
                    Swal.fire({
                        title: 'Xóa đánh giá thất bại !',
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
                    Danh sách bài đánh giá
                </h2>
                <div className="mb-3 py-4 px-3 bg-gray row gx-2">
                    <div className="col-md-3 mb-3">
                        <div className="text-center mb-2 fw-medium">Trạng thái</div>
                        <select className="form-select py-2 border-0"
                                onChange={handleChangeStatus}>
                            <option value="">Tất cả</option>
                            <option value="Chờ duyệt">Chờ duyệt</option>
                            <option value="Đã duyệt">Đã duyệt</option>
                        </select>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className="text-center mb-2 fw-medium text-truncate">
                            Tìm kiếm theo người đánh giá
                        </div>
                        <input type="text" className="form-control border-0 py-2"
                               placeholder="Nhập từ khóa tìm kiếm"
                               onChange={handleChangeNameSearch}/>
                    </div>

                    <div className="col-6 col-md-3 mb-3">
                        <div className="text-center mb-2 fw-medium">Ngày bắt đầu</div>
                        <input type="date" className="form-control border-0 py-2"
                               onChange={handleChangeStartDate}/>
                    </div>

                    <div className="col-6 col-md-3 mb-3">
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
                            <th>Sản phẩm</th>
                            <th className="d-none d-sm-table-cell">Nội dung</th>
                            <th className="d-none d-md-table-cell">Người đánh giá</th>
                            <th className="d-none d-md-table-cell">Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {!_.isEmpty(reviews) ? reviews.map((item, index) => {
                                return (
                                    <tr key={item.id} align="center">
                                        <td>
                                            <h6 className="m-0">{index + 1}</h6>
                                        </td>
                                        <td>{item.product.name}</td>
                                        <td className="d-none d-sm-table-cell">
                                            <div className="text-truncate" style={{width: '150px'}}>
                                                {item.comment}
                                            </div>
                                        </td>
                                        <td className="d-none d-md-table-cell">
                                            {item.username}
                                        </td>
                                        <td className="d-none d-md-table-cell">
                                            {item.status}
                                        </td>
                                        <td>
                                            {item.status === 'Chờ duyệt' &&
                                                <>
                                                    <button
                                                        className="btn border-success text-success me-2 d-none d-xl-inline-block"
                                                        onClick={() => handleConfirmReview(item)}>
                                                        Phê duyệt
                                                    </button>
                                                    <span className="text-success pointer d-inline d-xl-none fs-3 me-3">
                                                        <Tooltip title="Phê duyệt bài đánh giá" enterTouchDelay={0}
                                                                 arrow
                                                                 onClick={() => handleConfirmReview(item)}>
                                                            <i className="bi bi-check-circle"></i>
                                                        </Tooltip>
                                                    </span>
                                                </>
                                            }
                                            <button
                                                className="btn border-danger text-danger me-2 d-none d-xl-inline-block"
                                                onClick={() => handleDeleteReview(item)}>
                                                Xóa
                                            </button>
                                            <span className="text-danger pointer d-inline d-xl-none fs-3 me-3">
                                                        <Tooltip title="Xóa bài đánh giá" enterTouchDelay={0} arrow
                                                                 onClick={() => handleDeleteReview(item)}>
                                                            <i className="bi bi-x-circle"></i>
                                                        </Tooltip>
                                                    </span>
                                            <button className="btn border-primary text-primary d-none d-xl-inline-block"
                                                    onClick={() => handleReviewDetail(item)}>
                                                Chi tiết
                                            </button>
                                            <span className="text-primary pointer d-inline d-xl-none fs-3">
                                                <Tooltip title="Chi tiết" enterTouchDelay={0} arrow
                                                         onClick={() => handleReviewDetail(item)}>
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

            {!_.isEmpty(review) &&
                <Modal
                    show={showModal}
                    centered={true}
                    onHide={() => setShowModal(false)}
                    size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết bài đánh giá</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row px-3">
                            <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
                                <img className="img-fluid" src={review.avatar ? review.avatar : image_user} alt=""
                                     width={200}/>
                            </div>
                            <div className="col-12 col-md-7">
                                <p className="mb-1 py-1 border-bottom">
                                    <span className="fw-medium">Sản phẩm được đánh giá: </span>{review.product.name}
                                </p>
                                <p className="mb-1 py-1 border-bottom">
                                    <span className="fw-medium">Người đánh giá: </span>{review.username}
                                </p>
                                <p className="mb-1 py-1 border-bottom">
                                    <span className="fw-medium">Số điện thoại: </span>{review.phoneNumber}
                                </p>
                                <p className="mb-1 py-1 border-bottom" style={{textAlign: 'justify'}}>
                                    <span className="fw-medium">Nội dung đánh giá: </span>{review.comment}
                                </p>
                                <p className="mb-1 py-1 border-bottom">
                                    <span className="fw-medium">Điểm đánh giá: </span>{review.rating}/5
                                </p>
                                <p className="mb-1 py-1 border-bottom">
                                    <span
                                        className="fw-medium">Ngày đánh giá: </span>{review.createdAt && formatDate(review.createdAt)}
                                </p>
                                <p className="mb-1 py-1 border-bottom">
                                    <span className="fw-medium">Trạng thái: </span>{review.status}
                                </p>
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

export default ReviewsManager;