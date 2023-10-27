import React from 'react';
import Banner from "./Banner/Banner";
import Feature from "./Feature/Feature";
import Products from "./Products/Products";
import Brands from "./Brands/Brands";

const HomePage = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
    return (
        <>
            <Banner/>
            <Feature/>
            <Products/>
            <Brands/>
        </>
    )
};

export default HomePage;