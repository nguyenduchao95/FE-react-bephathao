import React, {useEffect, useState} from 'react';
import Slogan from "../ProductsPage/Slogan";
import {Link, useSearchParams} from "react-router-dom";
import {filterProducts} from "../../service/productService";
import Card from "../HomePage/Products/Card/Card";
import {Pagination} from "@mui/material";
import _ from "lodash";

const SearchPage = () => {
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const key = searchParams.get("tu-khoa");
    const [preKey, setPreKey] = useState("");
    useEffect(() => {
        const data = {nameSearch: key};
        if (key) {
            filterProducts(data, currentPage - 1, 8).then(response => {
                setProducts(response.data.content);
                setTotalPages(response.data.totalPages);
            }).catch(error => {
                console.log(error);
            })
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }, [key, currentPage])

    if (preKey !== key) {
        setPreKey(key);
        setCurrentPage(1);
    }

    const changePage = (event, value) => {
        setCurrentPage(value);
    }
    return (
        <div>
            <Slogan/>
            <div className="container">
                <h5 className="mb-5">
                    <i className="bi bi-search-heart me-2"></i>
                    Danh sách sản phẩm với từ khóa "{key}"
                </h5>
                <div className="row" style={{minHeight: '600px'}}>
                    {!_.isEmpty(products) ?
                            products.map(product => <Card product={product} key={product.id}/>)
                            :
                        <div className="text-center">
                            <h5 className="text-danger mb-4">Không tìm thấy sản phẩm phù hợp !</h5>
                            <Link to="/" className="btn btn-lg btn-primary">
                                <i className="bi bi-house-heart-fill me-2"></i>
                                Quay lại trang chủ
                            </Link>
                        </div>
                    }
                </div>
                <div className="col-12 pb-1 d-flex justify-content-center">
                    {totalPages ?
                        <Pagination count={totalPages} color="primary" page={currentPage}
                                    size="large" onChange={changePage}/>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchPage;