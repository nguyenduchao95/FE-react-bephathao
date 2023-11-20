import React from 'react';
import {TypeAnimation} from "react-type-animation";

const Slogan = () => {
    return (
        <div className="container-fluid mb-4">
            <div className="d-flex flex-column align-items-center justify-content-center"
                 style={{minHeight: '100px'}}>
                <TypeAnimation
                    sequence={[
                        'Bếp Hà Thảo',
                        1500,
                        'Thiết bị nhà bếp cao cấp',
                        1500
                    ]}
                    wrapper="span"
                    speed={50}
                    deletionSpeed={30}
                    className="fs-1"
                    style={{fontWeight: 'bold', display: 'inline-block', color: 'red', textAlign: 'center'}}
                    repeat={Infinity}
                />
            </div>
        </div>
    );
};

export default Slogan;