import React, {useEffect, useState} from 'react';
import Card from "./Card";
import {getAllProductsByCategory} from "../../../service/productService";
import _ from 'lodash';
import {Link} from "react-router-dom";

const ProductByCategory = ({category}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProductsByCategory(category.id).then(response => {
            setProducts(response.data.content);
        }).catch(error => {
            console.log(error);
        })
    }, [])
    return (
        <div className="pt-4 border-top">
            <div className="text-center mb-4 mx-xl-5 position-relative">
                <h2 className="section-title px-5 text-end"><span className="px-2">{category.name}</span></h2>
                <Link to={`/san-pham/danh-muc/${category.id}`} className="nav-link position-absolute top-50 end-0 btn-detail">
                    Xem tất cả<i className="bi bi-arrow-right-circle ms-1"></i>
                </Link>
            </div>
            <div className="row px-xl-5 pb-4">
                {!_.isEmpty(products) ?
                    products.map(product => <Card key={product.id} product={product}/>)
                    :
                    <h5 className="text-center text-danger">Chưa có sản phẩm</h5>
                }
            </div>
        </div>
    );
};

export default ProductByCategory;