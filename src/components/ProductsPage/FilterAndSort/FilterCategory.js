import React, {useEffect, useState} from 'react';
import {getAllCategories} from "../../../service/categoryService";
import {Spinner} from "react-bootstrap";
import _ from "lodash";
import {SwipeableDrawer} from "@mui/material";

const FilterCategory = ({categoryIds, setCategoryIds, setCurrentPage}) => {
    const [categories, setCategories] = useState([]);
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        getAllCategories().then(response => {
            setCategories(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const arrSet = new Set(categoryIds);
    const handleChange = (id) => {
        if (arrSet.has(id))
            arrSet.delete(id);
        else
            arrSet.add(id);
        setCategoryIds([...arrSet]);
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
    };

    const renderCategories = () => {
        if (_.isEmpty(categories)) {
            return (
                <div className="text-center">
                    <Spinner animation="border" variant="primary"/>
                </div>
            )
        }
        return (
            categories.map(category => (
                <div key={category.id}
                     className="custom-control d-flex align-items-center justify-content-between mb-3">
                    <input type="checkbox" className="custom-control-input" id={`category-${category.id}`}
                           checked={arrSet.has(category.id)}
                           onChange={() => handleChange(category.id)}
                    />
                    <label className="custom-control-label"
                           htmlFor={`category-${category.id}`}>{category.name}</label>
                </div>
            ))
        )
    }
    return (
        <div className="border-bottom pb-0 pb-md-4 mb-3">
            <h5 className="font-weight-semi-bold mb-4 d-flex justify-content-between align-items-center d-md-block">
                Lọc theo Danh mục
                <span className="btn border-secondary ms-3 d-inline d-md-none"
                      onClick={toggleDrawer(true)}>
                    Mở lựa chọn
                </span>
            </h5>
            <div className="d-none d-md-block">
                {renderCategories()}
            </div>

            <SwipeableDrawer
                anchor="left"
                open={showNav}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div className="p-4 pe-5">
                    {renderCategories()}
                </div>
            </SwipeableDrawer>
        </div>
    );
};

export default FilterCategory;