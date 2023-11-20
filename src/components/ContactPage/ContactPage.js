import React, {useEffect, useState} from 'react';
import Slogan from "../ProductsPage/Slogan";
import {getAllInfo} from "../../service/informationService";
import _ from "lodash";
import contact_img from "../../image/icons8-phone-message.gif";

const ContactPage = () => {
    const [information, setInformation] = useState({});
    useEffect(() => {
        getAllInfo().then((response) => {
            setInformation(response.data[0]);
        }).catch((error) => console.log(error))
    }, [])
    return (
        <div className="container mb-5">
            <Slogan/>
            <div>
                <h4 className="text-uppercase mb-3 d-flex align-items-center">
                    <img className="me-2" src={contact_img} width={40} alt=""/>
                    Liên hệ
                </h4>
                {!_.isEmpty(information) &&
                    <div className="contact-custom">
                        <p className="text-dark d-none d-sm-block">
                            <i className="bi bi-telephone-fill me-2"></i>
                            Hotline: <a href={`tel:${information.phoneNumber}`} className="contact-phone">{information.phoneNumber}</a>
                        </p>
                        <p className="text-dark d-none d-md-block">
                            <i className="bi bi-envelope-fill me-2"></i>
                            Email: <a href={`mailto:${information.email}`} className="contact-email">{information.email}</a>
                        </p>
                        <p className="text-dark">
                            <i className="bi bi-geo-alt-fill me-2"></i>
                            Địa chỉ: {information.address}
                        </p>
                    </div>
                }
            </div>
        </div>
    );
};

export default ContactPage;