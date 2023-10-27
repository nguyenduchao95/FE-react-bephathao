import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {getAllBrands} from "../../../service/brandService";
import {Spinner} from "react-bootstrap";

const Brands = () => {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };

    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAllBrands().then(response => {
            setBrands(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.log(error);
            setIsLoading(true);
        })
    }, [])

    if (isLoading) return (
        <div className="container-fluid py-3 text-center">
            <Spinner animation="border" variant="primary"/>
        </div>
    )

    return (
        <div className="container-fluid py-3" style={{overflow: 'hidden'}}>
            <Slider {...settings}>
                {brands && brands.map(brand => (
                    <div className="p-3" key={brand.id}>
                        <img src={brand.image} height="80" alt=""/>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Brands;