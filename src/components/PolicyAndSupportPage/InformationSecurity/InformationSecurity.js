import React, {useEffect, useState} from 'react';
import {getPolicySupportByTitle} from "../../../service/policySupportService";
import security_img from "../../../image/icons8-lock.gif";

const InformationSecurity = () => {
    const [informationSecurity, setInformationSecurity] = useState({});
    useEffect(()=>{
        const data = {title: 'Bảo mật thông tin'};
        getPolicySupportByTitle(data).then(response => {
            setInformationSecurity(response.data);
        }).catch(error => console.log(error))

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])
    return (
        <div className="col-12 col-lg-9">
            <h4 className="text-uppercase mb-3 d-flex align-items-center">
                <img src={security_img} alt="" className="me-2" width={40}/>
                Bảo mật thông tin
            </h4>
            <div className="common-content" dangerouslySetInnerHTML={{__html: informationSecurity.content}}></div>
        </div>
    );
};

export default InformationSecurity;