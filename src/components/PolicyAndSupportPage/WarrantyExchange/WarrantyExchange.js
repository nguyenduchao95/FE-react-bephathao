import React, {useEffect, useState} from 'react';
import {getPolicySupportByTitle} from "../../../service/policySupportService";
import warranty_img from "../../../image/icons8-warranty.gif";

const WarrantyExchange = () => {
    const [warrantyExchange, setWarrantyExchange] = useState({});
    useEffect(()=>{
        const data = {title: 'Bảo hành và đổi sản phẩm'};
        getPolicySupportByTitle(data).then(response => {
            setWarrantyExchange(response.data);
        }).catch(error => console.log(error))

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])
    return (
        <div className="col-12 col-lg-9">
            <h4 className="text-uppercase mb-3 d-flex align-items-center">
                <img src={warranty_img} className="me-2" width={40} alt=""/>
                Bảo hành và đổi sản phẩm
            </h4>
            <div className="common-content" dangerouslySetInnerHTML={{__html: warrantyExchange.content}}></div>
        </div>
    );
};

export default WarrantyExchange;