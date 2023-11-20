import React, {useEffect, useState} from 'react';
import {getPolicySupportByTitle} from "../../../service/policySupportService";
import service_img from "../../../image/icons8-service.gif";

const RepairService = () => {
    const [repairService, setRepairService] = useState({});
    useEffect(() => {
        const data = {title: 'Dịch vụ sửa chữa'};
        getPolicySupportByTitle(data).then(response => {
            setRepairService(response.data);
        }).catch(error => console.log(error))

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])
    return (
        <div className="col-12 col-lg-9">
            <h4 className="text-uppercase mb-3 d-flex align-items-center">
                <img src={service_img} alt="" className="me-2" width={40}/>
                Dịch vụ sửa chữa
            </h4>
            <div className="common-content" dangerouslySetInnerHTML={{__html: repairService.content}}></div>
        </div>
    );
};

export default RepairService;