import React from 'react';

const SortBy = ({sortBy, setSortBy, setCurrentPage}) => {
    const handleChangeSortBy = (event) => {
        setSortBy(event.target.value)
        setCurrentPage(1);
    }
    return (
        <div className="d-flex align-items-center justify-content-start mb-4">
            <h6 className="font-weight-semi-bold me-2">Sắp xếp theo: </h6>
            <select className="form-select form-select"
                    style={{width: '120px'}} value={sortBy}
                    onChange={handleChangeSortBy}>
                <option value="default">Mặc định</option>
                <option value="asc-name">A-Z</option>
                <option value="desc-name">Z-A</option>
                <option value="asc-price">Giá tăng</option>
                <option value="desc-price">Giá giảm</option>
            </select>
        </div>
    );
};

export default SortBy;