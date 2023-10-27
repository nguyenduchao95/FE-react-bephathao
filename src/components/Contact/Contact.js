import React from 'react';
import './contact.scss';
import icon_mess from "../../image/icons8-messenger-60.png";
import icon_zalo from "../../image/icons8-zalo-60.png";

const Contact = () => {
    return (
        <div className="d-flex flex-column justify-content-start contact">
            <a href="tel:0988068286">
                <div className="coccoc-alo-phone coccoc-alo-green coccoc-alo-show">
                    <div className="coccoc-alo-ph-circle"></div>
                    <div className="coccoc-alo-ph-circle-fill"></div>
                    <div className="coccoc-alo-ph-img-circle"></div>
                </div>
            </a>
            <a className="nav-link mb-2" href="https://m.me/BepThaoHa"><img src={icon_mess} alt='icon-mess'/></a>
            <a className="nav-link mb-2" href="https://zalo.me/0988068286"><img src={icon_zalo} alt='icon-zalo'/></a>
        </div>
    );
};

export default Contact;