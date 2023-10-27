import React, {useContext, useEffect, useRef, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import _ from "lodash";
import {getAllDistrictsByProvinceId, getAllProvinces, getAllWardsByDistrictId} from "../../../service/checkoutService";
import {editAccountInfoSchema} from "../../../validate/validate";
import AvatarUpload from "./Avatar/AvatarUpload";
import {editAccountInformation} from "../../../service/accountService";
import Swal from "sweetalert2";
import {ShopContext} from "../../../context-reducer/context/ShopContext";
import {editAccount} from "../../../context-reducer/actions/actions";
import {Modal} from "react-bootstrap";

const EditAccountInformation = ({accountInfo}) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [provinceName, setProvinceName] = useState(accountInfo.province ? accountInfo.province : "");
    const [districtName, setDistrictName] = useState(accountInfo.district ? accountInfo.district : "");
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarURL, setAvatarURL] = useState(accountInfo.avatar ? accountInfo.avatar : "");
    const [show, setShow] = useState(false);

    const {account, dispatch} = useContext(ShopContext);

    const avatarRef = useRef(null);

    useEffect(() => {
        getAllProvinces().then(response => {
            setProvinces(response.data.data);
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        if (provinceName) {
            const province = provinces.find(item => item.ProvinceName === provinceName);
            if (province && !_.isEmpty(province)) {
                getAllDistrictsByProvinceId(province.ProvinceID).then(response => {
                    setDistricts(response.data.data);
                }).catch(error => {
                    console.log(error)
                })
            }
        } else {
            setDistricts([]);
            setDistrictName("");
        }
    }, [provinceName, provinces])

    useEffect(() => {
        if (districtName) {
            const district = districts.find(item => item.DistrictName === districtName);
            if (district && !_.isEmpty(district)) {
                getAllWardsByDistrictId(district.DistrictID).then(response => {
                    setWards(response.data.data);
                }).catch(error => {
                    console.log(error)
                })
            }
        } else {
            setWards([]);
        }
    }, [districtName, districts])

    const handleChangeAvatar = (event, values) => {
        const file = event.target.files[0];
        setAvatarFile(file);
        values.avatar = file.name;
        if (avatarRef) avatarRef.current.value = null;
    }

    const handleEditAccountInfo = (values) => {
        const data = {...accountInfo, ...values};
        data.address = `${data.houseNumber}, ${data.ward}, ${data.district}, ${data.province}`;
        data.avatar = avatarURL;
        editAccountInformation(accountInfo.id, data).then(response => {
            account.avatar = avatarURL;
            dispatch(editAccount(account))
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật thông tin thành công!',
                showConfirmButton: false,
                timer: 1500
            }).then();
        }).catch(error => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Cập nhật thông tin thất bại!',
                showConfirmButton: false,
                timer: 1500
            }).then();
        })
        handleCloseModal();
    }

    const handleCloseModal = () => setShow(false);
    const handleShowModal = () => setShow(true);
    return (
        <>
            <div className="mt-3 text-center">
                <button className="btn btn-primary" onClick={handleShowModal}>
                    Sửa thông tin
                </button>
            </div>

            <Modal show={show} onHide={handleCloseModal} size="lg">
                <Formik
                    initialValues={{
                        firstName: accountInfo.firstName ? accountInfo.firstName : "",
                        lastName: accountInfo.lastName ? accountInfo.lastName : "",
                        phoneNumber: accountInfo.phoneNumber ? accountInfo.phoneNumber : "",
                        email: accountInfo.email ? accountInfo.email : "",
                        dateOfBirth: accountInfo.dateOfBirth ? accountInfo.dateOfBirth : "",
                        avatar: accountInfo.avatar ? accountInfo.avatar : "",
                        province: provinceName,
                        district: districtName,
                        ward: accountInfo.ward ? accountInfo.ward : "",
                        houseNumber: accountInfo.houseNumber ? accountInfo.houseNumber : ""
                    }}
                    innerRef={actions => {
                        if (actions && actions.touched.province)
                            setProvinceName(actions.values.province);

                        if (actions && actions.touched.district)
                            setDistrictName(actions.values.district);
                    }}
                    validationSchema={editAccountInfoSchema}
                    validateOnChange={true}
                    validateOnBlur={true}
                    onSubmit={values => {
                        handleEditAccountInfo(values);
                    }}
                >
                    {({values}) => (
                        <Form className="px-3 py-2">
                            <Modal.Header closeButton>
                                <h3 className="m-0 text-uppercase text-primary">Thay đổi thông tin</h3>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="mb-3 col-4">
                                        <label htmlFor="lastName" className="form-label">Họ và tên đệm</label>
                                        <Field type="text" className="form-control" id="lastName"
                                               placeholder="Nhập họ và tên đệm" name="lastName"/>
                                        <ErrorMessage name="lastName" className="text-danger"
                                                      component="small"/>
                                    </div>

                                    <div className="mb-3 col-4">
                                        <label htmlFor="firstName" className="form-label">Tên</label>
                                        <Field type="text" className="form-control" id="firstName"
                                               placeholder="Nhập tên" name="firstName"/>
                                        <ErrorMessage name="firstName" className="text-danger"
                                                      component="small"/>
                                    </div>

                                    <div className="mb-3 col-4">
                                        <label htmlFor="dateOfBirth" className="form-label">Ngày sinh</label>
                                        <Field type="date" className="form-control" id="dateOfBirth"
                                               placeholder="Chọn ngày tháng năm" name="dateOfBirth"/>
                                        <ErrorMessage name="dateOfBirth" className="text-danger"
                                                      component="small"/>
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label htmlFor="phoneNumber" className="form-label">Số điện
                                            thoại</label>
                                        <Field type="text" className="form-control" id="phoneNumber"
                                               placeholder="Nhập số điện thoại" name="phoneNumber"/>
                                        <ErrorMessage name="phoneNumber" className="text-danger"
                                                      component="small"/>
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <Field type="email" className="form-control" id="email"
                                               placeholder="Nhập email" name="email"/>
                                        <ErrorMessage name="email" className="text-danger" component="small"/>
                                    </div>

                                    <div className="col-4 form-group mb-3">
                                        <label className="form-label" htmlFor="province">
                                            Tỉnh/Thành phố
                                        </label>
                                        <Field as="select" className="form-select" id="province"
                                               name="province">
                                            <option value="">---Chọn Tỉnh/Thành phố---</option>
                                            {!_.isEmpty(provinces) && provinces.map(province => (
                                                <option key={province.ProvinceID}
                                                        value={province.ProvinceName}>
                                                    {province.ProvinceName}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="province" className="text-danger"
                                                      component="small"/>
                                    </div>

                                    <div className="col-4 form-group mb-3">
                                        <label className="form-label" htmlFor="district">Quận/Huyện</label>
                                        <Field as="select" className="form-select" id="district"
                                               name="district">
                                            <option value="">---Chọn Quận/Huyện---</option>
                                            {!_.isEmpty(districts) && districts.map(district => (
                                                <option key={district.DistrictID}
                                                        value={district.DistrictName}>
                                                    {district.DistrictName}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="district" className="text-danger"
                                                      component="small"/>
                                    </div>

                                    <div className="col-4 form-group mb-3">
                                        <label className="form-label" htmlFor="ward">Phường/Xã</label>
                                        <Field as="select" className="form-select" id="ward" name="ward">
                                            <option value="">---Chọn Phường/Xã---</option>
                                            {!_.isEmpty(wards) && wards.map(ward => (
                                                <option key={ward.WardCode} value={ward.WardName}>
                                                    {ward.WardName}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="ward" className="text-danger" component="small"/>
                                    </div>

                                    <div className="col-md-6 form-group mb-3">
                                        <label className="form-label" htmlFor="houseNumber">
                                            Địa chỉ chi tiết
                                        </label>
                                        <Field className="form-control" id="houseNumber" type="text"
                                               placeholder="Nhập số nhà" name="houseNumber"/>
                                        <ErrorMessage name="houseNumber" className="text-danger"
                                                      component="small"/>
                                    </div>

                                    <div className="col-6 mb-3">
                                        <label htmlFor="avatar" className="form-label">Ảnh đại diện</label>
                                        <input type="file" className="form-control" id="avatar" name="avatar"
                                               ref={avatarRef}
                                               onChange={event => handleChangeAvatar(event, values)}/>
                                        <ErrorMessage name="avatar" className="text-danger" component="small"/>
                                        <AvatarUpload file={avatarFile} avatarURL={avatarURL}
                                                      setAvatarURL={setAvatarURL}
                                                      setAvatarFile={setAvatarFile} values={values}/>
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
                    )}
                </Formik>
            </Modal>
        </>
    );
};

export default EditAccountInformation;