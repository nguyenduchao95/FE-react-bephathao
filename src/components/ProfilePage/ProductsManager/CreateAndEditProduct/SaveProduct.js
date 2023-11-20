import React, {useEffect, useState, useRef} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import _ from 'lodash';
import {Modal} from "react-bootstrap";
import Swal from 'sweetalert2'
import ImageItem from "./ImageItem";
import TinyMCE from "./TinyMCE";
import ImageItemEdit from "./ImageItemEdit";
import {productSchema} from "../../../../validate/validate";
import AvatarUpload from "../../AccountInformation/Avatar/AvatarUpload";
import {getAllImagesByProductId} from "../../../../service/imageService";
import {getAllCategories} from "../../../../service/categoryService";
import {getAllBrands} from "../../../../service/brandService";
import {createProduct, editProduct} from "../../../../service/adminService";

const SaveProduct = ({product, showModalSaveProduct, setShowModalSaveProduct, render, setRender}) => {
    const [isDescription, setIsDescription] = useState(true);
    const [showTinyMCE, setShowTinyMCE] = useState(false);
    const [avatarURL, setAvatarURL] = useState("");
    const [imagesURL, setImagesURL] = useState([]);
    const [imagesURLEdit, setImagesURLEdit] = useState([]);
    const [imagesURLDelete, setImagesURLDelete] = useState([]);
    const [avatarFile, setAvatarFile] = useState(null);
    const [imagesFile, setImagesFile] = useState([]);
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [technicalInformation, setTechnicalInformation] = useState("");

    const avatarRef = useRef();
    const imagesRef = useRef();

    useEffect(() => {
        if (product.id) {
            getAllImagesByProductId(product.id).then(response => {
                setImagesURLEdit(response.data);
            }).catch(error => console.log(error));
        } else {
            setImagesURLEdit([]);
        }

        setAvatarURL(product.avatar);
        setDescription(product.description);
        setTechnicalInformation(product.technicalInformation);
        setAvatarFile(null);
        setImagesFile([]);
        setImagesURLDelete([]);

        getAllCategories().then(response => {
            setCategories(response.data);
        }).catch(error => console.log(error))

        getAllBrands().then(response => {
            setBrands(response.data);
        }).catch(error => console.log(error))
    }, [product])

    const handleCloseTinyMCE = () => setShowTinyMCE(false);
    const handleShowDescription = () => {
        setShowTinyMCE(true);
        setIsDescription(true);
    }

    const handleShowFacility = () => {
        setShowTinyMCE(true);
        setIsDescription(false);
    }

    const editorRef = useRef(null);
    const handleSaveTinyMCE = (values) => {
        if (!editorRef.current) return;
        if (editorRef.current.getContent()) {
            if (isDescription) {
                values.description = "Bài viết mô tả đã được lưu. Click để sửa bài viết";
                setDescription(editorRef.current.getContent());
            } else {
                values.technicalInformation = "Bài viết giới thiệu thông số kĩ thuật đã được lưu. Click để sửa bài viết";
                setTechnicalInformation(editorRef.current.getContent());
            }
        } else {
            if (isDescription) {
                values.description = "";
                setDescription("");
            } else {
                values.technicalInformation = "";
                setTechnicalInformation("");
            }
        }
        handleCloseTinyMCE();
    };

    const handleAvatarFile = (event, values) => {
        values.avatar = 'is valid';
        setAvatarFile(event.target.files[0]);
        if (avatarRef) avatarRef.current.value = null;
    }

    const handleImagesFile = (event, values) => {
        values.images = 'is valid';
        setImagesFile([...imagesFile, ...event.target.files]);
        if (imagesRef) imagesRef.current.value = null;
    }

    const handleSaveProduct = (values) => {
        const data = {...values};
        data.description = description;
        data.technicalInformation = technicalInformation;
        data.avatar = avatarURL;
        data.category = {id: values.category}
        data.brand = {id: values.brand}
        if (product.id) {
            data.id = product.id;
            data.createdAt = product.createdAt;
            data.status = product.status;
            data.images = [...imagesURLEdit, ...imagesURL];
            data.imagesDelete = imagesURLDelete;
            editProduct(product.id, data).then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật sản phẩm thành công !',
                    showConfirmButton: false,
                    timer: 1500
                }).then();
                setShowModalSaveProduct(false);
                setRender(!render);
            }).catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Cập nhật sản phẩm thất bại !',
                    showConfirmButton: false,
                    timer: 1500
                }).then();
            })
        } else {
            data.images = imagesURL;
            createProduct(data).then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Thêm sản phẩm thành công !',
                    showConfirmButton: false,
                    timer: 1500
                }).then();
                setShowModalSaveProduct(false);
                setRender(!render);
            }).catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Thêm sản phẩm thất bại !',
                    showConfirmButton: false,
                    timer: 1500
                }).then();
            })
        }
    }

    return (
        <Modal
            show={showModalSaveProduct}
            onHide={() => setShowModalSaveProduct(false)}
            size="xl"
            centered
        >
            <div className="container p-4">
                {!_.isEmpty(product) &&
                    <Formik
                        initialValues={{
                            name: product.name,
                            category: product.category?.id,
                            code: product.code,
                            price: product.price,
                            sale: product.sale,
                            brand: product.brand.id,
                            origin: product.origin,
                            quantity: product.quantity,
                            guarantee: product.guarantee,
                            description: product.description ? "Bài viết mô tả đã được lưu. Click để sửa bài viết" : "",
                            technicalInformation: product.technicalInformation ? "Bài viết giới thiệu tiện ích đã được lưu. Click để sửa bài viết" : "",
                            avatar: product.avatar ? "is valid" : "",
                            images: product.avatar ? "is valid" : ""
                        }}
                        validationSchema={productSchema}
                        validateOnBlur={true}
                        validateOnChange={true}
                        onSubmit={values => {
                            handleSaveProduct(values);
                        }}>
                        {({values}) => (
                            <Form>
                                <div className="row">
                                    <h2 className="text-center text-uppercase mb-5 position-relative">
                                        {product.id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                                        <span className="position-absolute top-0 end-0 fs-4 px-sm-3 pointer"
                                        onClick={() => setShowModalSaveProduct(false)}>
                                            <i className="bi bi-x-lg"></i>
                                        </span>
                                    </h2>
                                    <div className="mb-3 col-lg-4 col-sm-12">
                                        <label htmlFor="name" className="form-label">
                                            Tên sản phẩm <span className="text-danger">*</span>
                                        </label>
                                        <Field type="text" className="form-control" id="name"
                                               placeholder="Nhập tên sản phẩm"
                                               name="name"/>
                                        <ErrorMessage name="name" className="text-danger" component="small"/>
                                    </div>

                                    <div className="mb-3 col-lg-4 col-sm-6">
                                        <label htmlFor="category" className="form-label">
                                            Danh mục <span className="text-danger">*</span>
                                        </label>
                                        <Field as="select" className="form-select" name="category" id="category">
                                            <option value="">---Vui lòng chọn---</option>
                                            {!_.isEmpty(categories) && categories.map(item => (
                                                <option value={item.id} key={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="category" className="text-danger" component="small"/>
                                    </div>

                                    <div className="mb-3 col-lg-4 col-sm-6">
                                        <label htmlFor="brand" className="form-label">
                                            Hãng <span className="text-danger">*</span>
                                        </label>
                                        <Field as="select" className="form-select" name="brand">
                                            <option value="">---Vui lòng chọn---</option>
                                            {!_.isEmpty(brands) && brands.map(item => (
                                                <option value={item.id} key={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="brand" className="text-danger" component="small"/>
                                    </div>

                                    <div className="mb-3 col-lg-4 col-sm-6">
                                        <label className="form-label" htmlFor="price">
                                            Giá tiền (VNĐ) <span className="text-danger">*</span>
                                        </label>
                                        <Field className="form-control" id="price" type="number" name="price"
                                               placeholder="Nhập giá tiền"/>
                                        <ErrorMessage name="price" className="text-danger" component="small"/>
                                    </div>

                                    <div className="mb-3 col-lg-4 col-sm-6">
                                        <label className="form-label" htmlFor="sale">
                                            Giảm giá (%) <span className="text-danger">*</span>
                                        </label>
                                        <Field className="form-control" id="sale" type="number" name="sale"
                                               placeholder="Nhập % giảm giá"/>
                                        <ErrorMessage name="sale" className="text-danger" component="small"/>
                                    </div>

                                    <div className="mb-3 col-lg-4 col-sm-6">
                                        <label className="form-label" htmlFor="code">
                                            Mã sản phẩm <span className="text-danger">*</span>
                                        </label>
                                        <Field className="form-control" id="area" type="text" name="code"
                                               placeholder="Nhập mã sản phẩm"/>
                                        <ErrorMessage name="code" className="text-danger" component="small"/>
                                    </div>

                                    <div className="mb-3 col-lg-4 col-sm-6">
                                        <label className="form-label" htmlFor="quantity">
                                            Số lượng trong kho <span className="text-danger">*</span>
                                        </label>
                                        <Field className="form-control" id="sale" type="number" name="quantity"
                                               placeholder="Nhập số lượng"/>
                                        <ErrorMessage name="quantity" className="text-danger" component="small"/>
                                    </div>

                                    <div className="mb-3 col-lg-4 col-sm-6">
                                        <label className="form-label" htmlFor="guarantee">
                                            Bảo hành (tháng) <span className="text-danger">*</span>
                                        </label>
                                        <Field className="form-control" id="sale" type="number" name="guarantee"
                                               placeholder="Nhập thời gian bảo hành"/>
                                        <ErrorMessage name="guarantee" className="text-danger" component="small"/>
                                    </div>

                                    <div className="mb-3 col-lg-4 col-sm-6">
                                        <label className="form-label" htmlFor="origin">
                                            Xuất xứ <span className="text-danger">*</span>
                                        </label>
                                        <Field className="form-control" id="origin" type="text" name="origin"
                                               placeholder="Nhập xuất xứ"/>
                                        <ErrorMessage name="origin" className="text-danger" component="small"/>
                                    </div>

                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="description" className="form-label">
                                            Mô tả sản phẩm <span className="text-danger">*</span>
                                        </label>
                                        <Field as="textarea" type="text" className="form-control" id="description"
                                               readOnly
                                               name="description" placeholder="Click để viết bài mô tả"
                                               onClick={handleShowDescription}/>
                                        <ErrorMessage name="description" className="text-danger" component="small"/>
                                    </div>

                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="technicalInformation" className="form-label">
                                            Thông số kĩ thuật <span className="text-danger">*</span>
                                        </label>
                                        <Field as="textarea" type="text" className="form-control"
                                               id="technicalInformation"
                                               readOnly
                                               name="technicalInformation"
                                               placeholder="Click để viết bài thông số kĩ thuật"
                                               onClick={handleShowFacility}/>
                                        <ErrorMessage name="technicalInformation" className="text-danger"
                                                      component="small"/>
                                    </div>

                                    <div className="col-lg-6 mb-3">
                                        <div className="row">
                                            <div className="col-12">
                                                <label htmlFor="avatar" className="form-label">
                                                    Ảnh đại diện <span className="text-danger">*</span>
                                                </label>
                                                <input type="file" className="form-control" id="avatar" name="avatar"
                                                       ref={avatarRef} accept="image/png, image/jpeg"
                                                       onChange={(event) => handleAvatarFile(event, values)}/>
                                                <ErrorMessage name="avatar" className="text-danger" component="small"/>
                                            </div>
                                            <div className="col-12">
                                                <AvatarUpload file={avatarFile} setAvatarFile={setAvatarFile}
                                                              setAvatarURL={setAvatarURL} avatarURL={avatarURL}
                                                              values={values}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 mb-3">
                                        <div className="row">
                                            <div className="col-12">
                                                <label htmlFor="images" className="form-label">
                                                    Ảnh chi tiết <span className="text-danger">*</span>
                                                </label>
                                                <input type="file" className="form-control" id="images" name="images"
                                                       multiple={true} accept="image/png, image/jpeg"
                                                       onChange={(event) => handleImagesFile(event, values)} ref={imagesRef}/>
                                                <ErrorMessage name="images" className="text-danger" component="small"/>
                                            </div>
                                            <div className="col-12">
                                                {!_.isEmpty(imagesURLEdit) && imagesURLEdit.map((item, index) => (
                                                    <ImageItemEdit key={item.id} index={index} url={item.url}
                                                                   setImageURLEdit={setImagesURLEdit} values={values}
                                                                   imagesFile={imagesFile}
                                                                   setImagesURLDelete={setImagesURLDelete}/>
                                                ))}

                                                {!_.isEmpty(imagesFile) && imagesFile.map(file => (
                                                    <ImageItem file={file} setImagesFile={setImagesFile}
                                                               setImagesURL={setImagesURL} key={file.name}
                                                               imagesFile={imagesFile} values={values} productId={product.id}/>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center mt-3">
                                        <button type="submit" className="btn btn-lg btn-primary me-3"
                                                style={{minWidth: '120px'}}>
                                            {product.id ? "Cập nhật" : "Thêm mới"}
                                        </button>
                                        <button className="btn btn-lg btn-secondary"
                                                style={{minWidth: '120px'}} type="button"
                                                onClick={() => setShowModalSaveProduct(false)}>
                                            Hủy
                                        </button>
                                    </div>
                                </div>

                                <Modal
                                    show={showTinyMCE}
                                    onHide={handleCloseTinyMCE}
                                    // size="lg"
                                    fullscreen={true}
                                    centered
                                >
                                    <TinyMCE editorRef={editorRef} handleSaveTinyMCE={handleSaveTinyMCE}
                                             description={description} isDescription={isDescription}
                                             technicalInformation={technicalInformation} values={values}
                                             handleClose={handleCloseTinyMCE}/>
                                </Modal>
                            </Form>
                        )}
                    </Formik>
                }
            </div>
        </Modal>
    );
};

export default SaveProduct;