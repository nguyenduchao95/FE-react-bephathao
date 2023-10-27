import React, {useEffect, useState} from 'react';
import {getAllBrands} from "../../../service/brandService";
import {Spinner} from "react-bootstrap";

const FilterBrand = ({brandIds, setBrandIds}) => {
    const [brands, setBrands] = useState([]);

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
    }
    return (
        <div className="mb-4 pb-3">
            <h5 className="font-weight-semi-bold mb-4">Lọc theo Hãng</h5>
            {brands.length ?
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
                :
                <div className="text-center">
                    <Spinner animation="border" variant="primary"/>
                </div>
            }
        </div>
    );
};

export default FilterBrand;