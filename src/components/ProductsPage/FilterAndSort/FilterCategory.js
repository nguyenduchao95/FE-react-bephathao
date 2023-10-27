import React, {useEffect, useState} from 'react';
import {getAllCategories} from "../../../service/categoryService";
import {Spinner} from "react-bootstrap";

const FilterCategory = ({categoryIds, setCategoryIds}) => {
    const [categories, setCategories] = useState([]);

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
    }
    return (
        <div className="border-bottom pb-4 mb-3">
            <h5 className="font-weight-semi-bold mb-4">Lọc theo Danh mục</h5>
            {categories.length ?
                categories.map(category => (
                    <div key={category.id}
                        className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input type="checkbox" className="custom-control-input" id={`category-${category.id}`}
                               checked={arrSet.has(category.id)}
                               onChange={() => handleChange(category.id)}
                        />
                        <label className="custom-control-label"
                               htmlFor={`category-${category.id}`}>{category.name}</label>
                    </div>
                ))
                :
                <div className="text-center">
                    <Spinner animation="border" variant="primary"/>
                </div>
            }
        </div>
    );
};

export default FilterCategory;