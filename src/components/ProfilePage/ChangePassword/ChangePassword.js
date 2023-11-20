import React, {useContext} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {changeAccountPasswordSchema} from "../../../validate/validate";
import {changeAccountPassword} from "../../../service/accountService";
import {ShopContext} from "../../../context-reducer/context/ShopContext";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {Tooltip} from "@mui/material";

const ChangePassword = () => {
    const {account} = useContext(ShopContext);
    const navigate = useNavigate();

    const handleChangePassword = (values) => {
        const data = {password: values.newPassword};
        changeAccountPassword(account.id, data).then(() => {
            navigate("/tai-khoan/thong-tin");
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật mật khẩu thành công!',
                showConfirmButton: false,
                timer: 1500
            }).then();
        }).catch(error => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Cập nhật mật khẩu thất bại!',
                showConfirmButton: false,
                timer: 1500
            }).then();
        })
    }
    return (
        <div className="col-12 col-lg-9">
            <h2 className="text-center text-uppercase">Thay đổi mật khẩu</h2>
            <div className="row d-flex justify-content-center align-items-center px-3">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card border-0" style={{borderRadius: "1rem"}}>
                        <div className="card-body">
                            <Formik
                                initialValues={{
                                    password: '',
                                    newPassword: '',
                                    confirmNewPassword: ''
                                }}
                                validationSchema={changeAccountPasswordSchema}
                                onSubmit={(values) => {
                                    handleChangePassword(values);
                                }}>
                                <Form>
                                    <div className="mb-4">
                                        <label className="form-label" htmlFor="password">
                                            Mật khẩu cũ <span className='text-danger'>*</span>
                                        </label>
                                        <Field type="text" id="password" name="password"
                                               className="form-control py-2"
                                               placeholder="Nhập mật khẩu hiện tại"/>
                                        <ErrorMessage name='password' className="text-danger" component="small"/>
                                    </div>
                                    <div className="mb-4 position-relative">
                                        <label className="form-label" htmlFor="newPassword">
                                            Mật khẩu mới <span className='text-danger'>*</span>
                                        </label>
                                        <Field type="password" id="newPassword" name="newPassword" title="Mật khẩu ít nhất 6 kí tự, chứa chữ cái viết hoa, viết thường
                                                    và ký tự số"
                                               placeholder="Ví dụ: User12"
                                               className="form-control py-2"/>
                                        <span className="position-absolute text-warning"
                                              style={{right: '-30px', top: '38px'}}>
                                                <Tooltip title="Mật khẩu ít nhất 6 kí tự, chứa chữ cái viết hoa, viết thường và ký tự số"
                                                         enterTouchDelay={0} arrow>
                                                    <i className="bi bi-info-circle fs-5"></i>
                                                </Tooltip>
                                        </span>
                                        <ErrorMessage name='newPassword' className="text-danger" component="small"/>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label" htmlFor="confirmNewPassword">
                                            Xác nhận mật khẩu mới <span className='text-danger'>*</span>
                                        </label>
                                        <Field type="password" id="confirmNewPassword"
                                               name="confirmNewPassword"
                                               placeholder="Xác nhận lại mật khẩu mới"
                                               className="form-control py-2"/>
                                        <ErrorMessage name='confirmNewPassword' className="text-danger"
                                                      component="small"/>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-lg btn-primary" type="submit">
                                            Cập nhật
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ChangePassword;