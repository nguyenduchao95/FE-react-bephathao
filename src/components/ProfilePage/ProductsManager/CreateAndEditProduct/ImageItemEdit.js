import React from 'react';
import _ from 'lodash';

const ImageItemEdit = ({setImageURLEdit, index, url, imagesFile, values, setImagesURLDelete}) => {
    const handleDeleteImage = () => {
        setImageURLEdit(pre => {
            if (pre.length === 1 && _.isEmpty(imagesFile)) {
                values.images = "";
            }
            const urlDelete = pre.splice(index, 1);
            setImagesURLDelete(preview => [...preview, ...urlDelete]);
            return [...pre];
        });
    }
    return (
        <div className="position-relative d-inline-block image-thumbnail me-2">
            <img src={url} className="img-thumbnail" alt=""
                 width={250} style={{height: '250px'}} loading="lazy"/>
            <span className="position-absolute top-0 p-2 fs-5 btn-delete"
                  onClick={handleDeleteImage}>
                  <i className="bi bi-trash-fill"></i>
            </span>
        </div>
    );
};

export default ImageItemEdit;