import React, {useEffect, useState} from 'react';
import {getAllBrands} from "../../../service/brandService";
import {Spinner} from "react-bootstrap";
import _ from "lodash";
import {SwipeableDrawer} from "@mui/material";

const FilterBrand = ({brandIds, setBrandIds, setCurrentPage}) => {
    const [brands, setBrands] = useState([]);
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        getAllBrands().then(response => {
            setBrands(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const arrSet = new Set(brandIds);
    const handleChange = (id) => {
        if (arrSet.has(id))
            arrSet.delete(id);
        else
            arrSet.add(id);
        setBrandIds([...arrSet]);
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

    const renderBrands = () => {
        if (_.isEmpty(brands)) {
            return (
                <div className="text-center">
                    <Spinner animation="border" variant="primary"/>
                </div>
            )
        }
        return (
            brands.map(brand => (
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
                     key={brand.id}>
                    <input type="checkbox" className="custom-control-input"
                           id={`brand-${brand.id}`}
                           checked={arrSet.has(brand.id)}
                           onChange={() => handleChange(brand.id)}
                    />
                    <label className="custom-control-label" htmlFor={`brand-${brand.id}`}>{brand.name}</label>
                </div>
            ))
        )
    }

    return (
        <div className="mb-4 pb-0 pb-md-4">
            <h5 className="font-weight-semi-bold mb-4 d-flex justify-content-between align-items-center d-md-block">
                Lọc theo Hãng
                <span className="btn border-secondary ms-3 d-inline d-md-none"
                      onClick={toggleDrawer(true)}>
                    Mở lựa chọn
                </span>
            </h5>

            <div className="d-none d-md-block">
                {renderBrands()}
            </div>

            <SwipeableDrawer
                anchor="left"
                open={showNav}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div className="p-4 pe-5">
                    {renderBrands()}
                </div>
            </SwipeableDrawer>
        </div>
    );
};

export default FilterBrand;