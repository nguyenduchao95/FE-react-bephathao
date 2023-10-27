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
                        1000,
                        'Thiết bị nhà bếp cao cấp',
                        1000
                    ]}
                    wrapper="span"
                    speed={50}
                    deletionSpeed={30}
                    style={{fontSize: '2em', fontWeight: 'bold', display: 'inline-block', color: 'red'}}
                    repeat={Infinity}
                />
            </div>
        </div>
    );
};

export default Slogan;