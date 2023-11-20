import React, {useEffect, useState} from 'react';
import {getPolicySupportByTitle} from "../../service/policySupportService";
import Slogan from "../ProductsPage/Slogan";
import home_img from "../../image/icons8-home.gif";

const IntroductionPage = () => {
    const [introduction, setIntroduction] = useState({});
    useEffect(() => {
        const data = {title: 'Giới thiệu'};
        getPolicySupportByTitle(data).then(response => {
            setIntroduction(response.data);
        }).catch(error => console.log(error))

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])
    return (
        <div className="container mb-5">
            <Slogan/>
            <div>
                <h4 className="text-uppercase mb-3 d-flex align-items-center">
                    <img className="me-2" src={home_img} width={40} alt=""/>
                    Giới thiệu về chúng tôi
                </h4>
                <div className="common-content" dangerouslySetInnerHTML={{__html: introduction.content}}></div>
            </div>
        </div>
    );
};

export default IntroductionPage;