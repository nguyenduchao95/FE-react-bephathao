import React, {useEffect, useState} from 'react';
import './products.scss';
import {getAllCategories} from "../../../service/categoryService";
import ProductByCategory from "./ProductByCategory";
import {Spinner} from "react-bootstrap";

const Products = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAllCategories().then(response => {
            setCategories(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.log(error);
            setIsLoading(true);
        })
    }, [])

    if (isLoading) return (
        <div className="container-fluid text-center">
            <Spinner animation="border" variant="primary"/>
        </div>
    )

    return (
        <div className="container-fluid">
            {categories && categories.map(category => (
                <ProductByCategory key={category.id} category={category}/>
            ))}
        </div>
    )
};

export default Products;