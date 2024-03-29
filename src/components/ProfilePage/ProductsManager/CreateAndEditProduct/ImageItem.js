import React, {useEffect, useState} from 'react';
import uploadFileWithProgress from "../../../../firebase/uploadFileWithProgress";
import CircularProgressWithLabel from "../../AccountInformation/Avatar/CircularProgressWithLabel";

const ImageItem = ({file, setImagesFile, setImagesURL, imagesFile, values, productId}) => {
    const [imagePreview, setImagePreview] = useState("");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const uploadImages = async () => {
            if (!file) return;
            setImagePreview(URL.createObjectURL(file));
            const imageUrl = await uploadFileWithProgress(file, setProgress);
            const imgObject = {
                url: imageUrl,
                product: {id: productId}
            }
            setImagesURL(pre => [...pre, imgObject]);
        }
        uploadImages().then();
    }, [])

    const handleDeleteImage = () => {
        setImagePreview("");
        if (imagesFile.length === 1) {
            values.images = "";
        }
        const index = imagesFile.findIndex(item => item.name === file.name);
        setImagesFile(pre => {
            pre.splice(index, 1);
            return [...pre];
        });
        setImagesURL(pre => {
            pre.splice(index, 1);
            return [...pre];
        });
    }

    return (
        <div className={`position-relative d-inline-block image-thumbnail me-2 ${imagePreview ? '' : 'd-none'}`}>
            <img src={imagePreview} className={`img-thumbnail ${progress < 100 ? 'brightness-50' : ''}`} alt=""
                 width={250} style={{height: '250px'}} loading="lazy"/>
            {progress >= 100 &&
                <span className="position-absolute top-0 p-2 fs-5 btn-delete"
                      onClick={handleDeleteImage}>
                      <i className="bi bi-trash-fill"></i>
                </span>
            }
            {progress < 100 &&
                <CircularProgressWithLabel value={progress}/>
            }
        </div>
    );
};

export default ImageItem;