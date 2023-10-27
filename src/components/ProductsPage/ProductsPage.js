import React, {useEffect, useState} from 'react';
import './productsPage.scss';
import Card from "../HomePage/Products/Card";
import FilterBrand from "./FilterAndSort/FilterBrand";
import FilterCategory from "./FilterAndSort/FilterCategory";
import FilterPrice from "./FilterAndSort/FilterPrice";
import SortBy from "./FilterAndSort/SortBy";
import {filterProducts} from "../../service/productService";
import {Pagination} from "@mui/material";
import {Spinner} from "react-bootstrap";
import Slogan from "./Slogan";
import {useParams} from "react-router-dom";

const ProductsPage = () => {
    const {categoryId, brandId} = useParams();
    const [categoryIdChange, setCategoryIdChange] = useState("");
    const [brandIdChange, setBrandIdChange] = useState("");
    const [products, setProducts] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryIds, setCategoryIds] = useState([]);
    const [brandIds, setBrandIds] = useState([]);
    const [prices, setPrices] = useState([0, 0]);
    const [sortBy, setSortBy] = useState("default");
    const [isLoading, setIsLoading] = useState(false);

    if (categoryId && categoryId !== categoryIdChange) {
        setCategoryIds([+categoryId]);
        setCategoryIdChange(categoryId);
        setBrandIds([]);
    }

    if (brandId && brandId !== brandIdChange) {
        setBrandIds([+brandId]);
        setBrandIdChange(brandId);
    }

    useEffect(() => {
        filterProducts(categoryIds, brandIds, prices, sortBy, currentPage - 1, 12).then(response => {
            setProducts(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.log(error);
            setIsLoading(true);
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [categoryIds, brandIds, prices, sortBy, currentPage])

    const changePage = (event, value) => {
        setCurrentPage(value);
    }

    return (
        <div>
            <Slogan/>

            <div className="container-fluid pt-3">
                <div className="row px-xl-5">
                    <div className="col-lg-3 col-md-12">
                        <FilterCategory categoryIds={categoryIds} setCategoryIds={setCategoryIds}/>
                        <FilterPrice prices={prices} setPrices={setPrices}/>
                        <FilterBrand brandIds={brandIds} setBrandIds={setBrandIds}/>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row pb-3">
                            <div className="col-12 pb-1">
                                <SortBy sortBy={sortBy} setSortBy={setSortBy}/>
                            </div>

                            <div className="row col-12" style={{minHeight: '1200px'}}>
                                {isLoading ?
                                    <div className="text-center">
                                        <Spinner animation="border" variant="primary"/>
                                    </div>
                                    :
                                    products.content?.length ?
                                        products.content.map(product => <Card product={product} key={product.id}/>)
                                        :
                                        <h5 className="mt-5 text-danger text-center">Không tìm thấy sản phẩm !</h5>
                                }

                            </div>
                            <div className="col-12 pb-1 d-flex justify-content-center">
                                {products.totalPages ?
                                    <Pagination count={products.totalPages} color="primary"
                                                size="large" onChange={changePage}/>
                                    :
                                    null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;