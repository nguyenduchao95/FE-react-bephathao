import React, {useEffect, useState} from 'react';
import _ from "lodash";
import {getAllInfo} from "../../../service/informationService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {editShopInfoSchema} from "../../../validate/validate";
import {Modal} from "react-bootstrap";
import {saveInformation} from "../../../service/adminService";
import Swal from "sweetalert2";

const ShopInformation = () => {
    const [shopInfo, setShopInfo] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [render, setRender] = useState(false);

    useEffect(() => {
        getAllInfo().then(response => {
            setShopInfo(response.data[0]);
        }).catch(error => {
            console.log(error)
        })
    }, [render])
    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleEditShopInfo = (values) => {
        const data = {...shopInfo, ...values};
        saveInformation(data).then(response => {
            Swal.fire({
                title: 'Thay đổi thông tin thành công !',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }).then();
            setRender(!render);
        }).catch(error => {
            console.log(error);
            Swal.fire({
                title: 'Thay đổi thông tin thất bại !',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            }).then();
        })
        setShowModal(false);
    }

    return (
        <div className="col-12 col-lg-9">
            <h2 className="text-center mb-4 text-uppercase mb-5">Thông tin cửa hàng</h2>
            <div className="px-5">
                <ul className="list-group">
                    <li className="list-group-item py-3">
                        <span className="mb-2 fw-medium">Liên hệ:</span> {shopInfo.phoneNumber}
                    </li>
                    <li className="list-group-item py-3">
                        <span className="mb-2 fw-medium">Email:</span> {shopInfo.email}
                    </li>
                    <li className="list-group-item py-3">
                        <span className="mb-2 fw-medium">Địa chỉ:</span> {shopInfo.address}
                    </li>
                </ul>
            </div>

            <div className="mt-3 text-center">
                <button className="btn btn-lg btn-primary" onClick={handleShowModal}>
                    Sửa thông tin
                </button>
            </div>

            {!_.isEmpty(shopInfo) &&
                <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                    <Formik
                        initialValues={{
                            phoneNumber: shopInfo.phoneNumber,
                            email: shopInfo.email,
                            address: shopInfo.address,
                        }}
                        validationSchema={editShopInfoSchema}
                        onSubmit={values => {
                            handleEditShopInfo(values);
                        }}
                    >
                        <Form className="px-3 py-2">
                            <Modal.Header closeButton>
                                <h2 className="m-0 text-uppercase">Thay đổi thông tin</h2>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="mb-3 col-12 col-sm-6">
                                        <label htmlFor="phoneNumber" className="form-label">
                                            Số điện thoại <span className="text-danger">*</span>
                                        </label>
                                        <Field type="text" className="form-control" id="phoneNumber"
                                               placeholder="Nhập số điện thoại" name="phoneNumber"/>
                                        <ErrorMessage name="phoneNumber" className="text-danger"
                                                      component="small"/>
                                    </div>

                                    <div className="mb-3 col-12 col-sm-6">
                                        <label htmlFor="email" className="form-label">
                                            Email <span className="text-danger">*</span>
                                        </label>
                                        <Field type="email" className="form-control" id="email"
                                               placeholder="Nhập email" name="email"/>
                                        <ErrorMessage name="email" className="text-danger" component="small"/>
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label className="form-label" htmlFor="address">
                                            Địa chỉ <span className="text-danger">*</span>
                                        </label>
                                        <Field className="form-control" id="address" type="text"
                                               placeholder="Nhập địa chỉ" name="address"/>
                                        <ErrorMessage name="address" className="text-danger"
                                                      component="small"/>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Đóng
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Cập nhật
                                </button>
                            </Modal.Footer>
                        </Form>
                    </Formik>
                </Modal>
            }
        </div>
    );
};

export default ShopInformation;