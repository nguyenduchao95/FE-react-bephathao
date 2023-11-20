import React, {useContext, useEffect, useState} from 'react';
import Comment from "./Comment";
import {reviewSchema} from "../../../validate/validate";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Swal from "sweetalert2";
import {ShopContext} from "../../../context-reducer/context/ShopContext";
import {createReview} from "../../../service/reviewService";
import {ProductDetailContext} from "../ProductDetailPage";
import {getAccountById} from "../../../service/accountService";
import _ from "lodash";

const Review = () => {
    const [goldStar, setGoldStar] = useState([1, 2, 3, 4, 5]);
    const [accountInfo, setAccountInfo] = useState({});
    const {account} = useContext(ShopContext);
    const {product} = useContext(ProductDetailContext);

    useEffect(() => {
        if (account.id) {
            getAccountById(account.id).then(response => {
                setAccountInfo(response.data);
            }).catch(error => console.log(error))
        } else {
            setAccountInfo({
                firstName: "",
                lastName: "",
                phoneNumber: ""
            })
        }
    }, [account])

    const handleSubmit = (values) => {
        const data = {
            ...values,
            avatar: account.avatar ? account.avatar : null,
            rating: Math.max(...goldStar),
            product: {id: product.id}
        }
        createReview(data).then(res => {
            Swal.fire({
                icon: 'success',
                title: 'Gửi bài đánh giá thành công !',
                text: 'Vui lòng chờ Admin kiểm duyệt',
                showConfirmButton: true
            }).then();
        }).catch(err => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Gửi bài đánh giá thất bại !',
                showConfirmButton: false,
                timer: 1500
            }).then();
        })
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <h4 className="mb-4">Nhận xét:</h4>
                    <Comment/>
                </div>
                <div className="col-md-6">
                    <h4 className="mb-4">Để lại đánh giá</h4>
                    <small>Bếp Hà Thảo cam kết bảo mật số điện thoại của bạn. Các trường bắt buộc được đánh dấu
                        *</small>
                    <div className="d-flex my-3">
                        <p className="mb-0 me-2">Đánh giá của bạn:</p>
                        <div className="star-review">
                            <i className="bi bi-star-fill star-1 px-1"
                               onMouseOver={() => setGoldStar([1])}>
                            </i>

                            <i className={`bi bi-star-fill star-2 px-1 ${goldStar.includes(2) ? '' : 'star-gray'}`}
                               onMouseOver={() => setGoldStar([1, 2])}>
                            </i>

                            <i className={`bi bi-star-fill star-3 px-1 ${goldStar.includes(3) ? '' : 'star-gray'}`}
                               onMouseOver={() => setGoldStar([1, 2, 3])}>
                            </i>

                            <i className={`bi bi-star-fill star-4 px-1 ${goldStar.includes(4) ? '' : 'star-gray'}`}
                               onMouseOver={() => setGoldStar([1, 2, 3, 4])}>
                            </i>

                            <i className={`bi bi-star-fill star-5 px-1 ${goldStar.includes(5) ? '' : 'star-gray'}`}
                               onMouseOver={() => setGoldStar([1, 2, 3, 4, 5])}>
                            </i>
                        </div>
                    </div>
                    {!_.isEmpty(accountInfo) &&
                        <Formik
                            initialValues={{
                                username: accountInfo.firstName ? `${accountInfo.lastName} ${accountInfo.firstName}` : "",
                                comment: "",
                                phoneNumber: accountInfo.phoneNumber ? accountInfo.phoneNumber : ""
                            }}
                            validationSchema={reviewSchema}
                            onSubmit={values => {
                                handleSubmit(values)
                            }}>
                            <Form>
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="comment">
                                        Nhận xét của bạn <span className="text-danger">*</span>
                                    </label>
                                    <Field as="textarea" id="comment" name="comment" cols="30" rows="5"
                                           className="form-control" placeholder="Nhập nhận xét"/>
                                    <ErrorMessage name="comment" className="text-danger mt-1" component="small"/>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="username">
                                        Họ và tên của bạn <span className="text-danger">*</span>
                                    </label>
                                    <Field type="text" className="form-control" id="username"
                                           name="username" placeholder="Nhập họ và tên"/>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="phoneNumber">
                                        Số điện thoại của bạn <span className="text-danger">*</span>
                                    </label>
                                    <Field type="text" className="form-control" id="phoneNumber"
                                           placeholder="Nhập số điện thoại" name="phoneNumber"/>
                                    <ErrorMessage name="phoneNumber" className="text-danger" component="small"/>
                                </div>
                                <div className="form-group mb-0">
                                    <button type="submit" className="btn btn-lg btn-primary px-4">Gửi</button>
                                </div>
                            </Form>
                        </Formik>
                    }
                </div>
            </div>
        </div>
    );
};

export default Review;