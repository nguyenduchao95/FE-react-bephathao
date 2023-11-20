import React, {useContext, useEffect, useState} from 'react';
import {getAllProductsByCategory} from "../../../service/productService";
import _ from 'lodash';
import Card from "../../HomePage/Products/Card/Card";
import {ProductDetailContext} from "../ProductDetailPage";

const SimilarProduct = () => {
    const {product} = useContext(ProductDetailContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProductsByCategory(product.category.id, product.id, 0, 4).then(response => {
            setProducts(response.data.content);
        }).catch(error => {
            console.log(error);
        })
    }, [])
    return (
        <div className="container-fluid py-5">
            <div className="text-center mb-4">
                <h2 className="section-title px-5"><span className="px-2">Sản phẩm tương tự</span></h2>
            </div>
            <div className="row px-xl-5">
                {!_.isEmpty(products) &&
                    products.map(item => <Card key={item.id} product={item}/>)
                }
            </div>
        </div>
    );
};

export default SimilarProduct;