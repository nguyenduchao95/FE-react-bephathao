import React, {useState} from 'react';
import _ from "lodash";
import {Spinner} from "react-bootstrap";
import {SwipeableDrawer} from "@mui/material";

const FilterPrice = ({prices, setPrices, setCurrentPage}) => {
    const [showNav, setShowNav] = useState(false);

    const priceRange = [
        {id: 1, min: 0, max: 5000000, desc: 'Dưới 5tr'},
        {id: 2, min: 5000000, max: 15000000, desc: 'Từ 5tr đến 15tr'},
        {id: 3, min: 15000000, max: 0, desc: 'Trên 15tr'}
    ]
    const handleChange = (min, max) => {
        if (prices[0] === min && prices[1] === max)
            setPrices([0, 0]);
        else
            setPrices([min, max]);
        setCurrentPage(1);
    }

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setShowNav(open);
    }

    const renderPrices = () => {
        return (
            priceRange.map(item => (
                <div className="custom-control d-flex align-items-center justify-content-between mb-3"
                     key={item.id}>
                    <input type="checkbox" className="custom-control-input"
                           id={`price-${item.id}`}
                           checked={prices[0] === item.min && prices[1] === item.max}
                           onChange={() => handleChange(item.min, item.max)}
                    />
                    <label className="custom-control-label" htmlFor={`price-${item.id}`}>{item.desc}</label>
                </div>
            ))
        )
    }

    return (
        <div className="border-bottom mb-4 pb-0 pb-md-4">
            <h5 className="font-weight-semi-bold mb-4 d-flex justify-content-between align-items-center d-md-block">
                Lọc theo Giá
                <span className="btn border-secondary ms-3 d-inline d-md-none"
                      onClick={toggleDrawer(true)}>
                    Mở lựa chọn
                </span>
            </h5>

            <div className="d-none d-md-block">
                {renderPrices()}
            </div>

            <SwipeableDrawer
                anchor="left"
                open={showNav}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div className="p-4 pe-5">
                    {renderPrices()}
                </div>
            </SwipeableDrawer>
        </div>
    );
};

export default FilterPrice;