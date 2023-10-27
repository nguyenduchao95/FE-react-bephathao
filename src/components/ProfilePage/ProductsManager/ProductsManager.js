import React, {useEffect, useState} from 'react';
import Swal from "sweetalert2";
import {Pagination} from "@mui/material";
import {formatCurrency} from "../../../service/format";
import {Link} from "react-router-dom";
import _ from 'lodash';
import {filterProducts} from "../../../service/productService";
import {getAllBrands} from "../../../service/brandService";
import {getAllCategories} from "../../../service/categoryService";
import {changeStatusProduct} from "../../../service/adminService";

const ProductsManager = () => {
    const [status, setStatus] = useState("");
    const [nameSearch, setNameSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [categoryIds, setCategoryIds] = useState([]);
    const [brandIds, setBrandIds] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortBy, setSortBy] = useState("default");
    const [render, setRender] = useState(false);

    useEffect(() => {
        filterProducts(categoryIds, brandIds, [0, 0], sortBy, currentPage - 1, 10, nameSearch, status).then(response => {
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages)
            setIsLoading(false);
        }).catch(error => {
            console.log(error);
            setIsLoading(true);
        })
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [currentPage, categoryIds, brandIds, status, nameSearch, sortBy, render])

    useEffect(() => {
        getAllBrands().then(response => {
            setBrands(response.data);
        }).catch(error => {
            console.log(error);
        })

        getAllCategories().then(response => {
            setCategories(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])
    const changePage = (event, value) => {
        setCurrentPage(value);
    }

    const handleChangeCategory = (event) => {
        if (event.target.value) {
            setCategoryIds([+event.target.value]);
            setCurrentPage(1);
        } else {
            setCategoryIds([]);
        }
    }

    const handleChangeBrand = (event) => {
        if (event.target.value) {
            setBrandIds([+event.target.value]);
            setCurrentPage(1);
        } else {
            setBrandIds([]);
        }
    };

    const handleChangeStatusProduct = (event, item) => {
        Swal.fire({
            title: `Bạn chắc chắn muốn thay đổi trạng thái từ "${item.status}" -> "${event.target.innerText}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng'
        }).then((result) => {
            if (result.isConfirmed) {
                changeStatusProduct(item.id, event.target.attributes.value.value).then(response => {
                    Swal.fire({
                        title: 'Thay đổi trạng thái thành công !',
                        icon: 'success',
                        showCancelButton: false,
                        timer: 1000
                    }).then();
                    setRender(!render);
                });
            }
        })
    }

    return (
        <div className="col-9 products-manager">
            <h3 className="text-uppercase text-center mb-5">Danh sách sản phẩm</h3>
            <div className="mb-3 py-4 px-3 bg-gray row gx-2">
                <div className="col-md-4">
                    <div className="text-center mb-2 fw-medium">Tìm kiếm theo tên</div>
                    <input type="text" className="form-control border-0 py-2"
                           placeholder="Nhập từ khóa tìm kiếm"
                           value={nameSearch}
                           onChange={event => setNameSearch(event.target.value)}/>
                </div>

                <div className="col-md-2">
                    <div className="text-center mb-2 fw-medium">Danh mục</div>
                    <select className="form-select py-2 border-0"
                            onChange={handleChangeCategory}>
                        <option value="">Tất cả</option>
                        {!_.isEmpty(categories) && categories.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-2">
                    <div className="text-center mb-2 fw-medium">Hãng</div>
                    <select className="form-select py-2 border-0"
                            onChange={handleChangeBrand}>
                        <option value="">Tất cả</option>
                        {!_.isEmpty(brands) && brands.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-2">
                    <div className="text-center mb-2 fw-medium">Trạng thái</div>
                    <select className="form-select py-2 border-0"
                            onChange={event => setStatus(event.target.value)}>
                        <option value="">Tất cả</option>
                        <option value="Còn hàng">Còn hàng</option>
                        <option value="Hết hàng">Hết hàng</option>
                        <option value="Ngừng bán">Ngừng bán</option>
                    </select>
                </div>

                <div className="col-md-2">
                    <div className="text-center mb-2 fw-medium">Giá bán</div>
                    <select className="form-select py-2 border-0"
                            onChange={event => setSortBy(event.target.value)}>
                        <option value="default">Mặc định</option>
                        <option value="asc-price">Giá tăng dần</option>
                        <option value="desc-price">Giá giảm dần</option>
                    </select>
                </div>

            </div>
            <Link to="/add-house" className="btn btn-lg btn-primary mb-3 btn-add-product">
                Thêm mới sản phẩm
            </Link>
            <div style={{minHeight: '500px'}}>
                <table className="table">
                    <thead>
                    <tr align="center" style={{fontSize: '18px'}}>
                        <th>STT</th>
                        <th>Sản phẩm</th>
                        <th style={{minWidth: '130px'}}>Tồn kho</th>
                        <th style={{width: '150px'}}>Trạng thái</th>
                        <th style={{minWidth: '150px'}}>Hành động</th>
                    </tr>
                    </thead>
                    <tbody style={{verticalAlign: 'middle'}}>
                    {!_.isEmpty(products) ? products.map((item, index) => {
                            return (
                                <tr key={item.id} align="center">
                                    <td>
                                        <h5>{index + 1}</h5>
                                    </td>
                                    <td className="text-truncate">
                                        <Link to={`/san-pham/chi-tiet/${item.id}`}
                                              className="nav-link d-flex align-items-center">
                                            <img className="flex-shrink-0 img-fluid border rounded"
                                                 src={item.avatar} alt=""
                                                 style={{width: 80, height: 80}}/>
                                            <div className="d-flex flex-column text-start ps-4">
                                                <h5 className="text-truncate">{item.name}</h5>
                                                <div className="text-truncate">
                                                    <i className="bi bi-cash me-2"
                                                       style={{color: "rgb(0,185,142)"}}></i>
                                                    {formatCurrency(item.price - item.price * item.sale / 100)}
                                                    {item.sale ?
                                                        <del
                                                            className="ms-2 text-secondary">{formatCurrency(item.price)}</del>
                                                        :
                                                        null
                                                    }
                                                </div>
                                            </div>
                                        </Link>
                                    </td>

                                    <td className="mb-3">
                                        <b>{item.quantity}</b>
                                    </td>
                                    <td className="mb-3">
                                        <button className="btn border-primary text-primary dropdown-toggle" type="button"
                                                data-bs-toggle="dropdown" style={{minWidth: '130px'}}>
                                            {item.status}
                                        </button>
                                        <ul className="dropdown-menu" style={{minWidth: '130px'}}>
                                            <li className={`dropdown-item nav-item ${item.status === 'Còn hàng' ? 'd-none' : ''}`}
                                                value="Còn hàng"
                                                onClick={(event) => handleChangeStatusProduct(event, item)}>
                                                Còn hàng
                                            </li>
                                            <li className={`dropdown-item nav-item ${item.status === 'Hết hàng' ? 'd-none' : ''}`}
                                                value="Hết hàng"
                                                onClick={(event) => handleChangeStatusProduct(event, item)}>
                                                Hết hàng
                                            </li>
                                            <li className={`dropdown-item nav-item ${item.status === 'Ngừng bán' ? 'd-none' : ''}`}
                                                value="Ngừng bán"
                                                onClick={(event) => handleChangeStatusProduct(event, item)}>
                                                Ngừng bán
                                            </li>
                                        </ul>
                                    </td>

                                    <td className="mb-3">
                                        <Link to={`/edit-house/${item.id}`} className="btn border-danger text-danger">
                                            Sửa thông tin
                                        </Link>
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
            {totalPages > 0 ?
                <div className="col-12 mt-5 d-flex justify-content-center">
                    <Pagination count={totalPages} size="large" variant="outlined" shape="rounded"
                                onChange={changePage} color="primary"/>
                </div>
                :
                null
            }
        </div>
    )
};

export default ProductsManager;