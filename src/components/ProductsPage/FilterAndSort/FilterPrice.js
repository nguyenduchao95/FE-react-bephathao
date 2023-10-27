import React from 'react';

const FilterPrice = ({prices, setPrices}) => {
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
    }
    return (
        <div className="border-bottom mb-4 pb-3">
            <h5 className="font-weight-semi-bold mb-4">Lọc theo Giá</h5>
            {priceRange.length && priceRange.map(item => (
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
                     key={item.id}>
                    <input type="checkbox" className="custom-control-input"
                           id={`price-${item.id}`}
                           checked={prices[0] === item.min && prices[1] === item.max}
                           onChange={() => handleChange(item.min, item.max)}
                    />
                    <label className="custom-control-label" htmlFor={`price-${item.id}`}>{item.desc}</label>
                </div>
            ))}
        </div>
    );
};

export default FilterPrice;