import React, {useEffect, useState} from 'react';
import {getAllBanners} from "../../../service/bannerService";
import _ from "lodash";
import {Modal} from "react-bootstrap";
import uploadFileWithProgress from "../../../firebase/uploadFileWithProgress";
import CircularProgressWithLabel from "../AccountInformation/Avatar/CircularProgressWithLabel";
import "./bannersManager.scss";
import {deleteBanner, saveBanner} from "../../../service/adminService";
import Swal from "sweetalert2";

const BannersManager = () => {
    const [banners, setBanners] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(null);

    useEffect(() => {
        getAllBanners().then(response => {
            setBanners(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    useEffect(() => {
        let url;
        const uploadImages = async () => {
            if (!file) return;
            url = URL.createObjectURL(file);
            setAvatarPreview(url);
            const imageUrl = await uploadFileWithProgress(file, setProgress);
            saveBanner({image: imageUrl}).then(response => {
                setBanners(prevState => [...prevState, response.data]);
                setAvatarPreview("");
            }).catch(error => console.log(error))
        }
        uploadImages().then();

        return () => {
            if (url) URL.revokeObjectURL(url);
        }
    }, [file])

    const handleShowImage = (img) => {
        setShowModal(true);
        setImage(img);
    }

    const handleDeleteImage = (id) => {
        Swal.fire({
            title: `Bạn chắc chắn muốn xóa ảnh ?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBanner(id).then(response => {
                    setBanners(prevState => prevState.filter(item => item.id !== id));
                    Swal.fire({
                        title: 'Xóa ảnh thành công !',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then();
                }).catch(error => {
                    console.log(error);
                    Swal.fire({
                        title: 'Xóa ảnh thất bại !',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    }).then();
                })
            }
        })
    }
    return (
        <div className="col-12 col-lg-9 banners-manager">
            <h2 className="text-center mb-4 text-uppercase mb-5">Danh sách banner</h2>
            <label htmlFor="image-banner" className="btn btn-primary mb-3">
                <i className="bi bi-image-fill me-2"></i>
                Thêm ảnh
            </label>
            <input type="file" id="image-banner" accept="image/png, image/jpeg" hidden
                   onChange={event => setFile(event.target.files[0])}/>
            <div className="row">
                {!_.isEmpty(banners) && banners.map(item => (
                    <div className="position-relative col-6 mb-3 pointer" key={item.id}>
                        <span className="position-absolute top-0 icon-delete"
                              onClick={() => handleDeleteImage(item.id)}>
                            <i className="bi bi-x-lg"></i>
                        </span>
                        <img className="img-thumbnail" src={item.image} alt="" style={{aspectRatio: '16/9'}}
                             onClick={() => handleShowImage(item.image)}/>
                    </div>
                ))}

                <div
                    className={`col-6 mb-3 pointer mt-0 avatar-upload ${avatarPreview ? '' : 'd-none'}`}>
                    <img src={avatarPreview} className={`img-thumbnail ${progress < 100 ? 'brightness-50' : ''}`} alt=""
                         style={{aspectRatio: '16/9'}} loading="lazy"/>
                    {progress < 100 &&
                        <CircularProgressWithLabel value={progress}/>
                    }
                </div>
            </div>

            {image &&
                <Modal show={showModal}
                       onHide={() => setShowModal(false)}
                       size="lg" centered
                       className="banner-modal">
                    <Modal.Body className="text-center p-0">
                        <img className="img-fluid" src={image} alt="" style={{aspectRatio: '16/9'}}/>
                    </Modal.Body>
                </Modal>
            }
        </div>
    );
};

export default BannersManager;