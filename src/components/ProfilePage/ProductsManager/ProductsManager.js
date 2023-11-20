import React, {useEffect, useState} from 'react';
import Swal from "sweetalert2";
import {Pagination, Tooltip} from "@mui/material";
import {formatCurrency} from "../../../service/format";
import {Link} from "react-router-dom";
import _ from 'lodash';
import {filterProducts} from "../../../service/productService";
import {getAllBrands} from "../../../service/brandService";
import {getAllCategories} from "../../../service/categoryService";
import {changeStatusProduct} from "../../../service/adminService";
import SaveProduct from "./CreateAndEditProduct/SaveProduct";

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
    const [showModalSaveProduct, setShowModalSaveProduct] = useState(false);

    useEffect(() => {
        const data = {categoryIds, brandIds, sortBy, nameSearch, status};
        filterProducts(data, currentPage - 1, 10).then(response => {
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages)
        }).catch(error => {
            console.log(error);
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

    const handleShowCreateProduct = () => {
        setProduct({
            name: "",
            category: "",
            code: "",
            price: "",
            sale: "",
            brand: "",
            origin: "",
            quantity: "",
            guarantee: "",
            description: "",
            technicalInformation: "",
            avatar: "",
            images: ""
        })
        setShowModalSaveProduct(true);
    }

    const handleShowEditProduct = (item) => {
        setProduct({...item});
        setShowModalSaveProduct(true);
    }

    return (
        <div className="col-12 col-lg-9 products-manager">
            <h2 className="text-uppercase text-center mb-5">Danh sách sản phẩm</h2>
            <div className="mb-3 py-4 px-3 bg-gray row gx-2">
                <div className="col-12 col-sm-6 col-md-4 mb-3">
                    <div className="text-center mb-2 fw-medium">Tìm kiếm theo tên</div>
                    <input type="text" className="form-control border-0 py-2"
                           placeholder="Nhập từ khóa tìm kiếm"
                           value={nameSearch}
                           onChange={event => setNameSearch(event.target.value)}/>
                </div>

                <div className="col-6 col-sm-6 col-md-4 col-lg-2 mb-3">
                    <div className="text-center mb-2 fw-medium">Danh mục</div>
                    <select className="form-select py-2 border-0"
                            onChange={handleChangeCategory}>
                        <option value="">Tất cả</option>
                        {!_.isEmpty(categories) && categories.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className="col-6 col-sm-4 col-md-4 col-lg-2 mb-3">
                    <div className="text-center mb-2 fw-medium">Hãng</div>
                    <select className="form-select py-2 border-0"
                            onChange={handleChangeBrand}>
                        <option value="">Tất cả</option>
                        {!_.isEmpty(brands) && brands.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className="col-6 col-sm-4 col-md-4 col-lg-2">
                    <div className="text-center mb-2 fw-medium">Trạng thái</div>
                    <select className="form-select py-2 border-0"
                            onChange={event => setStatus(event.target.value)}>
                        <option value="">Tất cả</option>
                        <option value="Còn hàng">Còn hàng</option>
                        <option value="Hết hàng">Hết hàng</option>
                        <option value="Ngừng bán">Ngừng bán</option>
                    </select>
                </div>

                <div className="col-6 col-sm-4 col-md-4 col-lg-2">
                    <div className="text-center mb-2 fw-medium">Giá bán</div>
                    <select className="form-select py-2 border-0"
                            onChange={event => setSortBy(event.target.value)}>
                        <option value="default">Mặc định</option>
                        <option value="asc-price">Giá tăng dần</option>
                        <option value="desc-price">Giá giảm dần</option>
                    </select>
                </div>

            </div>
            <button className="btn btn-lg btn-primary mb-3 btn-add-product"
                    onClick={handleShowCreateProduct}>
                Thêm mới sản phẩm
            </button>
            <div style={{minHeight: '500px', overflowX: 'auto'}}>
                <table className="table table-custom">
                    <thead>
                    <tr align="center">
                        <th>STT</th>
                        <th>Sản phẩm</th>
                        <th className="d-none d-md-table-cell">
                            Tồn kho
                        </th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!_.isEmpty(products) ? products.map((item, index) => {
                            return (
                                <tr key={item.id} align="center">
                                    <td>
                                        <span className="fw-medium">{index + 1}</span>
                                    </td>
                                    <td className="text-truncate">
                                        <Link to={`/san-pham/chi-tiet/${item.id}`}
                                              className="nav-link d-inline d-md-flex align-items-center">
                                            <img className="img-fluid border rounded d-none d-md-block me-3"
                                                 src={item.avatar} alt=""
                                                 style={{width: 80, height: 80}}/>
                                            <div className="d-inline d-md-flex flex-column text-start">
                                                <div className="text-truncate fw-medium d-none d-md-block">
                                                    {item.name}
                                                </div>

                                                <Tooltip title={item.name} enterTouchDelay={0} arrow>
                                                    <div style={{width: '100px'}} className="text-truncate fw-medium d-block d-md-none">
                                                        {item.name}
                                                    </div>
                                                </Tooltip>

                                                <div className="text-truncate d-none d-md-block">
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

                                    <td className="mb-3 d-none d-md-table-cell">
                                        <span>{item.quantity}</span>
                                    </td>
                                    <td className="mb-3">
                                        <button className="btn border-primary text-primary dropdown-toggle" type="button"
                                                data-bs-toggle="dropdown">
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
                                        <button className="btn border-danger text-danger"
                                                onClick={() => handleShowEditProduct(item)}>
                                            Sửa thông tin
                                        </button>
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

            {!_.isEmpty(product) &&
                <SaveProduct showModalSaveProduct={showModalSaveProduct}
                             setShowModalSaveProduct={setShowModalSaveProduct}
                             product={product} render={render} setRender={setRender}/>
            }
        </div>
    )
};

export default ProductsManager;