import React, {useContext, useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import _ from 'lodash';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import {FreeMode, Navigation, Thumbs} from 'swiper/modules';
import {ProductDetailContext} from "../ProductDetailPage";
import {getAllImagesByProductId} from "../../../service/imageService";

const Images = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState();
    const [images, setImages] = useState([]);
    const {product} = useContext(ProductDetailContext);

    useEffect(() => {
        if (product.id) {
            getAllImagesByProductId(product.id).then(response => {
                setImages(response.data);
            }).catch(error => {
                console.log(error);
            })
        }
    }, [product])

    return (
        <div className="product-images">
            {!_.isEmpty(images) &&
                <>
                    <Swiper
                        style={{
                            '--swiper-navigation-color': '#038efc',
                            '--swiper-pagination-color': '#fff',
                        }}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{swiper: thumbsSwiper}}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper2"
                    >
                        {images.map(image =>
                            <SwiperSlide key={image.id}>
                                <img className="img-thumbnail" src={image.url} alt=""/>
                            </SwiperSlide>
                        )}
                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                    >
                        {images.map(image =>
                            <SwiperSlide key={image.id}>
                                <img src={image.url} alt=""/>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </>
            }
        </div>
    );
}

export default Images;
