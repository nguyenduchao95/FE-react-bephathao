import React, {createContext, useEffect, useState} from 'react';
import Slogan from "../ProductsPage/Slogan";
import ProductShortDetail from "./ProductShortDetail/ProductShortDetail";
import './productDetailPage.scss';
import ProductLongDetail from "./ProductLongDetail/ProductLongDetail";
import {getProductById} from "../../service/productService";
import {useParams} from "react-router-dom";
import SimilarProduct from "./SimilarProduct/SimilarProduct";
import _ from 'lodash';
import {countReviewsByProductId} from "../../service/reviewService";

export const ProductDetailContext = createContext();

const ProductDetailPage = () => {
    const {productId} = useParams()
    const [product, setProduct] = useState({});
    const [countReviews, setCountReviews] = useState(0);

    useEffect(() => {
        getProductById(productId).then(response => {
            setProduct(response.data);
        }).catch(error => {
            console.log(error);
        })

        countReviewsByProductId(productId).then(response => {
            setCountReviews(response.data);
        }).catch(error => {
            console.log(error);
        })

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])
    return (
        <ProductDetailContext.Provider value={{product, countReviews}}>
            <Slogan/>

            <div className="container-fluid py-5">
                <ProductShortDetail/>
                <ProductLongDetail/>
            </div>

            {
                !_.isEmpty(product) && <SimilarProduct/>
            }
        </ProductDetailContext.Provider>
    );
};

export default ProductDetailPage;