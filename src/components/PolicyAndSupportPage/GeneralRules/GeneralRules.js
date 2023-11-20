import React, {useEffect, useState} from 'react';
import {getPolicySupportByTitle} from "../../../service/policySupportService";
import rule_img from "../../../image/icons8-literature.gif";

const GeneralRules = () => {
    const [generalRules, setGeneralRules] = useState({});
    useEffect(()=>{
        const data = {title: 'Quy định chung'};
        getPolicySupportByTitle(data).then(response => {
            setGeneralRules(response.data);
        }).catch(error => console.log(error))

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])
    return (
        <div className="col-12 col-lg-9">
            <h4 className="text-uppercase mb-3 d-flex align-items-center">
                <img src={rule_img} alt="" className="me-2" width={40}/>
                Quy định chung
            </h4>
            <div className="common-content" dangerouslySetInnerHTML={{__html: generalRules.content}}></div>
        </div>
    );
};

export default GeneralRules;