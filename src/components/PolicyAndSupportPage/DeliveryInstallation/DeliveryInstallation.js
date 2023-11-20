import React, {useEffect, useState} from 'react';
import {getPolicySupportByTitle} from "../../../service/policySupportService";
import delivery_img from "../../../image/icons8-delivery.gif";

const DeliveryInstallation = () => {
    const [deliveryInstallation, setDeliveryInstallation] = useState({});
    useEffect(()=>{
        const data = {title: 'Giao hàng và lắp đặt'};
        getPolicySupportByTitle(data).then(response => {
            setDeliveryInstallation(response.data);
        }).catch(error => console.log(error))

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])
    return (
        <div className="col-12 col-lg-9">
            <h4 className="text-uppercase mb-3 d-flex align-items-center">
                <img src={delivery_img} width={40} className="me-2" alt=""/>
                Giao hàng và lắp đặt
            </h4>
            <div className="common-content" dangerouslySetInnerHTML={{__html: deliveryInstallation.content}}></div>
        </div>
    );
};

export default DeliveryInstallation;