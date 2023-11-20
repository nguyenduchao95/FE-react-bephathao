import React, {useEffect, useState} from 'react';
import {getPolicySupportByTitle} from "../../../service/policySupportService";
import benefit_img from "../../../image/icons8-protect.gif";

const Benefit = () => {
    const [benefit, setBenefit] = useState({});
    useEffect(()=>{
        const data = {title: 'Quyền lợi sau mua hàng'};
        getPolicySupportByTitle(data).then(response => {
            setBenefit(response.data);
        }).catch(error => console.log(error))

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])
    return (
        <div className="col-12 col-lg-9">
            <h4 className="text-uppercase mb-3 d-flex align-items-center">
                <img src={benefit_img} className="me-2" width={40} alt=""/>
                Quyền lợi sau mua hàng
            </h4>
            <div className="common-content" dangerouslySetInnerHTML={{__html: benefit.content}}></div>
        </div>
    );
};

export default Benefit;