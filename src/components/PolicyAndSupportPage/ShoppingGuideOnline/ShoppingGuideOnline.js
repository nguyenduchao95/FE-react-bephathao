import React, {useEffect, useState} from 'react';
import {getPolicySupportByTitle} from "../../../service/policySupportService";
import shopping_img from "../../../image/icons8-buying.gif";

const ShoppingGuideOnline = () => {
    const [shoppingGuideOnline, setShoppingGuideOnline] = useState({});
    useEffect(()=>{
        const data = {title: 'Hướng dẫn mua hàng online'};
        getPolicySupportByTitle(data).then(response => {
            setShoppingGuideOnline(response.data);
        }).catch(error => console.log(error))

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])
    return (
        <div className="col-12 col-lg-9">
            <h4 className="text-uppercase mb-3 d-flex align-items-center">
                <img src={shopping_img} alt="" className="me-2" width={40}/>
                Hướng dẫn mua hàng online
            </h4>
            <div className="common-content" dangerouslySetInnerHTML={{__html: shoppingGuideOnline.content}}></div>
        </div>
    );
};

export default ShoppingGuideOnline;