import React, {useEffect, useState} from 'react';
import {getAllBanners} from "../../../service/bannerService";
import {Spinner} from "react-bootstrap";

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getAllBanners().then(response => {
            setBanners(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.log(error);
            setIsLoading(true);
        })
    }, [])
    return (
        <div className='container text-center'>
            {isLoading ?
                <Spinner animation="border" variant="primary"/>
                :
                <div id="carouselSlider" className="carousel carousel-dark slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {banners && banners.map((banner, index) => (
                            <div className={`carousel-item ${!index ? 'active' : ''}`} key={banner.id} data-bs-interval="3000">
                                <img className='img-slider img-fluid' src={banner.image} alt="..."/>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselSlider"
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselSlider"
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            }
        </div>
    );
};

export default Banner;