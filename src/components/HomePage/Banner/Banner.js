import React, {useEffect, useState} from 'react';
import {getAllBanners} from "../../../service/bannerService";
import {Spinner} from "react-bootstrap";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Autoplay} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import _ from "lodash";

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
                <>
                    <Swiper navigation={true} modules={[Navigation, Autoplay]}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}>
                        {!_.isEmpty(banners) && banners.map(banner => (
                            <SwiperSlide key={banner.id}>
                                <img className='img-slider img-fluid' src={banner.image} alt="..."
                                     style={{aspectRatio: '16/9'}} width={900}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            }
        </div>
    );
};

export default Banner;