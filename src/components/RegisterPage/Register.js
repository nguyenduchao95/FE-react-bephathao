import React, {useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import Swal from "sweetalert2";
import {registerSchema} from "../../validate/validate";
import {register} from "../../service/loginRegisterService";

const Register = ({setShowLogin}) => {
    const [showUsernameHelp, setShowUsernameHelp] = useState(true);
    const [showEmailHelp, setShowEmailHelp] = useState(true);
    const [showPasswordHelp, setShowPasswordHelp] = useState(true);
    const handleSubmit = (value) => {
        register(value)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng ký tài khoản thành công !',
                    showConfirmButton: false,
                    timer: 1500
                }).then()
                setShowLogin(true);
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Đăng ký tài khoản thất bại !',
                    showConfirmButton: false,
                    timer: 1500
                }).then()
            })
    }
    return (
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12">
                    <div className="card border-0" style={{borderRadius: "15px"}}>
                        <div className="card-body" style={{padding: '10px 40px'}}>
                            <h2 className="text-uppercase text-center mb-4 mt-2">Đăng ký</h2>
                            <Formik
                                initialValues={{
                                    username: "",
                                    email: "",
                                    password: "",
                                    confirmPassword: ""
                                }}
                                validationSchema={registerSchema}
                                onSubmit={values => {
                                    handleSubmit(values)
                                }}>
                                <Form>
                                    <div className="mb-2">
                                        <label className="form-label" htmlFor="username">Tên đăng nhập:</label>
                                        <Field type="text" id="username" name="username" placeholder="Ví dụ: user"
                                               className="form-control py-2"
                                               onInput={() => setShowUsernameHelp(false)}/>
                                        <ErrorMessage name="username" className="text-danger mt-1"
                                                      component="small"/>
                                        {showUsernameHelp &&
                                            <small className="text-secondary d-block">
                                                Tên đăng nhập không được chứa kí tự đặc biệt.
                                            </small>
                                        }
                                    </div>

                                    <div className="mb-2">
                                        <label className="form-label" htmlFor="email">Email:</label>
                                        <Field type="email" id="email" name="email" placeholder="Ví dụ: user@gmail.com"
                                               className="form-control py-2" onInput={() => setShowEmailHelp(false)}/>
                                        <ErrorMessage name="email" className="text-danger mt-1" component="small"/>
                                        {showEmailHelp &&
                                            <small className="text-secondary d-block">
                                                Email phải đúng định dạng email.
                                            </small>
                                        }
                                    </div>

                                    <div className="mb-2">
                                        <label className="form-label" htmlFor="password">Mật khẩu:</label>
                                        <Field type="password" id="password" name="password" placeholder="Ví dụ: User12"
                                               className="form-control py-2"
                                               onInput={() => setShowPasswordHelp(false)}/>
                                        <ErrorMessage name="password" className="text-danger mt-1"
                                                      component="small"/>
                                        {showPasswordHelp &&
                                            <small className="text-secondary d-block">
                                                Mật khẩu phải chứa chữ cái viết hoa, viết thường và ký tự số.
                                            </small>
                                        }
                                    </div>

                                    <div className="mb-2">
                                        <label className="form-label" htmlFor="confirmPassword">
                                            Xác nhận lại mật khẩu:
                                        </label>
                                        <Field type="password" id="confirmPassword" name="confirmPassword"
                                               placeholder="Xác nhận mật khẩu"
                                               className="form-control py-2"/>
                                        <ErrorMessage name="confirmPassword" className="text-danger mt-1"
                                                      component="small"/>
                                    </div>

                                    <div className="d-flex justify-content-center mt-3">
                                        <button type="submit" className="btn btn-primary btn-lg">
                                            Đăng ký
                                        </button>
                                    </div>

                                    <div className="text-center text-muted mt-3 mb-2">
                                        Bạn đã có tài khoản?
                                        <span className="fw-medium ms-2 text-primary pointer"
                                              onClick={() => setShowLogin(true)}>
                                            <u>Đăng nhập</u>
                                        </span>
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

export default Register;