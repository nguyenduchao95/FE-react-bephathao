import React, {useContext, useEffect, useState} from 'react';
import Slogan from "../ProductsPage/Slogan";
import {getAllDistrictsByProvinceId, getAllProvinces, getAllWardsByDistrictId} from "../../service/checkoutService";
import _ from 'lodash';
import {ShopContext} from "../../context-reducer/context/ShopContext";
import {formatCurrency} from "../../service/format";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {orderSchema} from "../../validate/validate";
import {createOrder} from "../../service/orderService";
import Swal from 'sweetalert2'
import {emptyCart} from "../../context-reducer/actions/actions";
import {useNavigate} from "react-router-dom";
import {getAccountById} from "../../service/accountService";

const CheckoutPage = () => {
    const {carts, account, dispatch} = useContext(ShopContext);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [provinceName, setProvinceName] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [accountInfo, setAccountInfo] = useState({});
    const navigate = useNavigate();

    const totalPrice = carts.reduce((total, item) => total + (item.product.price - item.product.price * item.product.sale / 100) * item.quantity, 0);


    useEffect(() => {
        getAllProvinces().then(response => {
            setProvinces(response.data.data);
        }).catch(error => {
            console.log(error)
        })
        if (account.id) {
            getAccountById(account.id).then(response => {
                setAccountInfo(response.data);
                setProvinceName(response.data.province);
                setDistrictName(response.data.district);
            }).catch(error => {
                console.log(error)
            })
        } else {
            setAccountInfo({
                firstName: "",
                lastName: "",
                phoneNumber: "",
                province: "",
                district: "",
                ward: "",
                houseNumber: ""
            });
        }
        window.scrollTo({
            top: 200,
            behavior: "smooth"
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

    const handleOrder = (values) => {
        const data = {...values};
        if (!_.isEmpty(carts)) {
            const customer = `${data.lastName} ${data.firstName}`;
            const address = `${data.houseNumber}, ${data.ward}, ${data.district}, ${data.province}`;
            const order = {
                carts,
                totalPrice,
                customer,
                phoneNumber: data.phoneNumber,
                address,
                shipTo: data.shipTo,
                payment: data.payment,
                account: account.id ? {id: account.id} : null
            }
            createOrder(order).then(response => {
                dispatch(emptyCart());
                Swal.fire({
                    icon: 'success',
                    title: 'Đặt hàng thành công!',
                    text: 'Tiếp tục mua hàng'
                }).then();
                navigate("/");
            }).catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Đặt hàng thất bại!',
                }).then();
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Giỏ hàng trống!',
            }).then();
        }
    }

    return (
        <div>
            <Slogan/>
            <div className="container-fluid pt-5">
                {!_.isEmpty(accountInfo) &&
                    <Formik
                        initialValues={{
                            firstName: accountInfo.firstName,
                            lastName: accountInfo.lastName,
                            phoneNumber: accountInfo.phoneNumber,
                            province: accountInfo.province,
                            district: accountInfo.district,
                            ward: accountInfo.ward,
                            houseNumber: accountInfo.houseNumber,
                            shipTo: "Giao hàng tận nơi",
                            payment: "Banking"
                        }}
                        innerRef={actions => {
                            if (actions && actions.touched.province)
                                setProvinceName(actions.values.province);

                            if (actions && actions.touched.district)
                                setDistrictName(actions.values.district);
                        }}
                        validationSchema={orderSchema}
                        onSubmit={values => {
                            handleOrder(values);
                        }}
                    >
                        {({values}) => (
                            <Form>
                                <div className="row px-xl-5">
                                    <div className="col-lg-8 mb-4">
                                        <h4 className="fw-semibold mb-4">Thông tin đặt hàng</h4>
                                        <div className="row">
                                            <div className="col-md-4 form-group mb-3">
                                                <label className="form-label" htmlFor="lastName">Họ và tên đệm</label>
                                                <Field className="form-control" id="lastName" type="text"
                                                       name="lastName" placeholder="Nhập họ và tên đệm"/>
                                                <ErrorMessage name="lastName" className="text-danger"
                                                              component="small"/>
                                            </div>
                                            <div className="col-md-4 form-group mb-3">
                                                <label className="form-label" htmlFor="firstName">Tên</label>
                                                <Field className="form-control" id="firstName" type="text"
                                                       name="firstName" placeholder="Nhập tên"/>
                                                <ErrorMessage name="firstName" className="text-danger"
                                                              component="small"/>
                                            </div>
                                            <div className="col-md-4 form-group mb-3">
                                                <label className="form-label" htmlFor="phoneNumber">Số điện
                                                    thoại</label>
                                                <Field className="form-control" id="phoneNumber" type="text"
                                                       name="phoneNumber" placeholder="Nhập số điện thoại"/>
                                                <ErrorMessage name="phoneNumber" className="text-danger"
                                                              component="small"/>
                                            </div>

                                            <div className="col-md-6 form-group mb-3">
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

                                            <div className="col-md-6 form-group mb-3">
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

                                            <div className="col-md-6 form-group mb-3">
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
                                                <label className="form-label" htmlFor="houseNumber">Địa chỉ chi
                                                    tiết</label>
                                                <Field className="form-control" id="houseNumber" type="text"
                                                       placeholder="Nhập số nhà" name="houseNumber"/>
                                                <ErrorMessage name="houseNumber" className="text-danger"
                                                              component="small"/>
                                            </div>

                                            <div className="col-md-4 form-group mb-4">
                                                <div className="custom-control custom-radio d-flex align-items-center">
                                                    <Field type="radio" className="custom-control-input" name="shipTo"
                                                           id="shipto1" checked={values.shipTo === "Giao hàng tận nơi"}
                                                           value="Giao hàng tận nơi"
                                                    />
                                                    <label className="custom-control-label" htmlFor="shipto1">
                                                        Giao hàng tận nơi
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="col-md-6 form-group mb-4">
                                                <div className="custom-control custom-radio d-flex align-items-center">
                                                    <Field type="radio" className="custom-control-input" name="shipTo"
                                                           id="shipto2" checked={values.shipTo === "Nhận tại cửa hàng"}
                                                           value="Nhận tại cửa hàng"
                                                    />
                                                    <label className="custom-control-label" htmlFor="shipto2">
                                                        Nhận tại cửa hàng
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="card border-secondary mb-5">
                                            <div className="card-header bg-gray">
                                                <h4 className="fw-semi-bold m-0">Tổng đơn hàng</h4>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="fw-medium mb-3">Sản phẩm</h5>

                                                {!_.isEmpty(carts) && carts.map(cart => {
                                                    const newPrice = cart.product.price - cart.product.price * cart.product.sale / 100;
                                                    return (
                                                        <div key={cart.product.id}
                                                             className="d-flex justify-content-between">
                                                            <p className="text-truncate">{cart.product.name}</p>
                                                            <p>{formatCurrency(newPrice * cart.quantity)}</p>
                                                        </div>
                                                    )
                                                })
                                                }

                                                <hr className="mt-0"/>
                                                <div className="d-flex justify-content-between mb-3 pt-1">
                                                    <h6 className="fw-medium">Tạm tính</h6>
                                                    <h6 className="fw-medium">{formatCurrency(totalPrice)}</h6>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <h6 className="fw-medium">Phí vận chuyển</h6>
                                                    <h6 className="fw-medium">0 ₫</h6>
                                                </div>
                                            </div>
                                            <div className="card-footer border-secondary bg-transparent">
                                                <div className="d-flex justify-content-between mt-2">
                                                    <h5 className="fw-bold">Tổng tiền</h5>
                                                    <h5 className="fw-bold">{formatCurrency(totalPrice)}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card border-secondary mb-5">
                                            <div className="card-header bg-gray">
                                                <h4 className="fw-semibold m-0">Thanh toán</h4>
                                            </div>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <div
                                                        className="custom-control custom-radio d-flex align-items-center">
                                                        <Field type="radio" className="custom-control-input"
                                                               name="payment"
                                                               id="payment1" value="COD"
                                                               checked={values.payment === "COD"}
                                                        />
                                                        <label className="custom-control-label" htmlFor="payment1">
                                                            Hình thức thanh toán COD
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <div
                                                        className="custom-control custom-radio d-flex align-items-center">
                                                        <Field type="radio" className="custom-control-input"
                                                               name="payment"
                                                               id="payment2" value="Banking"
                                                               checked={values.payment === "Banking"}
                                                        />
                                                        <label className="custom-control-label" htmlFor="payment2">
                                                            Chuyển khoản
                                                        </label>
                                                    </div>
                                                    <div className="m-2">
                                                        <p className="m-0">- Tài khoản ngân hàng: Techcombank</p>
                                                        <p className="m-0">- Số tài khoản: 88888888</p>
                                                        <p className="m-0">- Chủ tài khoản: Vũ Thị Hà</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer border-secondary bg-transparent text-center">
                                                <button className="btn btn-lg btn-block btn-primary fw-bold my-2 py-2"
                                                        type="submit">
                                                    Đặt hàng
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                }
            </div>
        </div>
    );
};

export default CheckoutPage;