import React, {useEffect, useState} from 'react';
import Swal from "sweetalert2";
import {Pagination, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import _ from 'lodash';
import {getAllExperiences} from "../../../service/experienceService";
import {formatDate} from "../../../service/format";
import SaveExperience from "./CreateAndEditExperience/SaveExperience";
import {deleteExperience} from "../../../service/adminService";

const ExperiencesManager = () => {
    const [title, setTitle] = useState("");
    const [sortBy, setSortBy] = useState("createdAt-desc");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [experiences, setExperiences] = useState([]);
    const [experience, setExperience] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [render, setRender] = useState(false);
    const [showModalSaveExperience, setShowModalSaveExperience] = useState(false);

    useEffect(() => {
        const data = {title, sortBy, startDate, endDate};
        getAllExperiences(data).then(response => {
            setExperiences(response.data.content);
            setTotalPages(response.data.totalPages);
        }).catch(error => {
            console.log(error);
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [currentPage, title, sortBy, startDate, endDate, render])

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
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

    const handleChangeSortBy = (event) => {
        setSortBy(event.target.value);
        setCurrentPage(1);
    }

    const changePage = (event, value) => {
        setCurrentPage(value);
    }

    const handleShowCreateExperience = () => {
        setExperience({
            title: "",
            content: "",
            avatar: ""
        })
        setShowModalSaveExperience(true);
    }

    const handleShowEditExperience = (item) => {
        setExperience({...item});
        setShowModalSaveExperience(true);
    }

    const handleDeleteExperience = (item) => {
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
                deleteExperience(item.id).then(response => {
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

    return (
        <div className="col-12 col-lg-9">
            <h2 className="text-uppercase text-center mb-5">Danh sách bài viết</h2>
            <div className="mb-3 py-4 px-3 bg-gray row gx-2">
                <div className="col-6 col-md-3 mb-3">
                    <div className="text-center mb-2 fw-medium">Tìm kiếm theo tên</div>
                    <input type="text" className="form-control border-0 py-2"
                           placeholder="Nhập từ khóa tìm kiếm"
                           value={title}
                           onChange={handleChangeTitle}/>
                </div>

                <div className="col-6 col-md-3 mb-3">
                    <div className="text-center mb-2 fw-medium">Lượt xem</div>
                    <select className="form-select py-2 border-0" onChange={handleChangeSortBy}>
                        <option value="createdAt-desc">Mặc định</option>
                        <option value="view-asc">Tăng dần</option>
                        <option value="view-desc">Giảm dần</option>
                    </select>
                </div>

                <div className="col-6 col-md-3 mb-3">
                    <div className="text-center mb-2 fw-medium">Ngày bắt đầu</div>
                    <input type="date" className="form-control" onChange={handleChangeStartDate}/>
                </div>

                <div className="col-6 col-md-3 mb-3">
                    <div className="text-center mb-2 fw-medium">Ngày kết thúc</div>
                    <input type="date" className="form-control" onChange={handleChangeEndDate}/>
                </div>
            </div>
            <button className="btn btn-lg btn-primary mb-3 btn-add-product"
                    onClick={handleShowCreateExperience}>
                Thêm mới bài viết
            </button>
            <div style={{minHeight: '500px', overflowX: 'auto'}}>
                <table className="table table-custom">
                    <thead>
                        <tr align="center" style={{fontSize: '18px'}}>
                            <th>STT</th>
                            <th>Tên bài viết</th>
                            <th className="d-none d-md-table-cell">Lượt xem</th>
                            <th className="d-none d-md-table-cell">Ngày đăng</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    {!_.isEmpty(experiences) ? experiences.map((item, index) => {
                            return (
                                <tr key={item.id} align="center">
                                    <td>
                                        <span className="fw-medium">{index + 1}</span>
                                    </td>
                                    <td className="text-truncate">
                                        <Link to={`/kinh-nghiem-hay/${item.id}`}
                                              className="nav-link d-flex align-items-center">
                                            <img className="img-fluid border rounded d-none d-sm-block me-3"
                                                 src={item.avatar} alt=""
                                                 style={{width: 80, height: 80}}/>
                                            <div className="text-truncate fw-medium d-none d-md-block">
                                                {item.title}
                                            </div>

                                            <Tooltip title={item.title} enterTouchDelay={0} arrow>
                                                <div style={{width: '180px'}} className="text-truncate fw-medium d-block d-md-none">
                                                    {item.title}
                                                </div>
                                            </Tooltip>
                                        </Link>
                                    </td>

                                    <td className="mb-3 d-none d-md-table-cell">
                                        <span>{item.view}</span>
                                    </td>

                                    <td className="mb-3 d-none d-md-table-cell">
                                        <span>{formatDate(item.createdAt)}</span>
                                    </td>

                                    <td className="mb-3">
                                        <button className="btn border-primary text-primary me-2 d-none d-md-inline"
                                                onClick={() => handleShowEditExperience(item)}>
                                            Sửa bài
                                        </button>
                                        <span className="text-primary pointer d-inline d-md-none fs-3 me-4">
                                            <Tooltip title="Sửa bài viết" enterTouchDelay={0} arrow
                                                     onClick={() => handleShowEditExperience(item)}>
                                                <i className="bi bi-pencil"></i>
                                            </Tooltip>
                                        </span>
                                        <button className="btn border-danger text-danger d-none d-md-inline"
                                                onClick={() => handleDeleteExperience(item)}>
                                            Xóa bài
                                        </button>
                                        <span className="text-danger pointer d-inline d-md-none fs-3">
                                            <Tooltip title="Xóa bài viết" enterTouchDelay={0} arrow
                                                     onClick={() => handleDeleteExperience(item)}>
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

            {totalPages ?
                <div className="mt-4 d-flex justify-content-center">
                    <Pagination count={totalPages} color="primary"
                                size="large" onChange={changePage}/>
                </div>
                :
                null
            }

            {!_.isEmpty(experience) &&
                <SaveExperience showModalSaveExperience={showModalSaveExperience}
                                setShowModalSaveExperience={setShowModalSaveExperience}
                                experience={experience} render={render} setRender={setRender}/>
            }
        </div>
    )
};

export default ExperiencesManager;