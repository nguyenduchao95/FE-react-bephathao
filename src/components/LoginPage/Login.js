import React, {useContext, useState} from 'react';
import './login.scss';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {loginSchema} from "../../validate/validate";
import icon_google from '../../image/icons8-google-50.png';
import icon_facebook from '../../image/icons8-facebook-52.png';
import {Link} from "react-router-dom";
import {ShopContext} from "../../context-reducer/context/ShopContext";
import {saveAccount} from "../../context-reducer/actions/actions";
import Swal from "sweetalert2";
import {login} from "../../service/loginRegisterService";

const Login = ({handleCloseModal, setShowLogin}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(true);
    const [errorPassword, setErrorPassword] = useState("");
    const {dispatch} = useContext(ShopContext);

    const handleLogin = (value) => {
        login(value)
            .then(res => {
                if (remember) {
                    localStorage.setItem("account-bephathao", JSON.stringify(res.data));
                }
                dispatch(saveAccount(res.data));
                handleCloseModal();
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng nhập thành công!',
                    showConfirmButton: false,
                    timer: 1500
                }).then()
            })
            .catch(err => {
                setErrorPassword("Sai mật khẩu");
            })
    }
    return (
        <div className="container h-100 container-login">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12">
                    <div className="card border-0" style={{borderRadius: '1rem'}}>
                        <div className="card-body p-4 text-center">
                            <h2 className="mb-5 text-uppercase">Đăng nhập</h2>
                            <Formik
                                initialValues={{
                                    username: "",
                                    password: ""
                                }}
                                validationSchema={loginSchema}
                                onSubmit={values => {
                                    handleLogin(values);
                                }}>
                                {({values}) => (
                                    <Form>
                                        <div className="form-outline">
                                            <Field type="text" id="username" name="username"
                                                   className={`form-control form-control-lg ${values.username ? 'active' : ''}`}/>
                                            <label className="form-label" htmlFor="username">Tên đăng nhập</label>
                                            <div className="form-notch">
                                                <div className="form-notch-leading" style={{width: '9px'}}></div>
                                                <div className="form-notch-middle" style={{width: '90px'}}></div>
                                                <div className="form-notch-trailing"></div>
                                            </div>
                                        </div>
                                        <ErrorMessage name="username" className="d-block text-danger text-start mt-1"
                                                      component="small"/>

                                        <div className="form-outline mt-4">
                                            <Field type={`${showPassword ? 'text' : 'password'}`} id="password"
                                                   name="password"
                                                   className={`form-control form-control-lg ${values.password ? 'active' : ''}`}
                                                   onInput={() => setErrorPassword("")}/>
                                            <label className="form-label" htmlFor="password">Mật khẩu</label>
                                            <div className="form-notch">
                                                <div className="form-notch-leading" style={{width: '9px'}}></div>
                                                <div className="form-notch-middle" style={{width: '60px'}}></div>
                                                <div className="form-notch-trailing"></div>
                                            </div>
                                            <span className="position-absolute text-muted top-50 py-2 px-3 end-0"
                                                  style={{transform: 'translateY(-50%)', cursor: 'pointer'}}
                                                  onClick={() => setShowPassword(!showPassword)}>
                                                <i className={`${showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}`}></i>
                                            </span>
                                        </div>
                                        <ErrorMessage name="password" className="d-block text-danger text-start mt-1"
                                                      component="small"/>
                                        <small className="d-block text-danger text-start mt-1">{errorPassword}</small>

                                        <div className="form-check my-3 text-start">
                                            <input type="checkbox" className="form-check-input shadow-none"
                                                   id="remember"
                                                   checked={remember}
                                                   onChange={() => setRemember(!remember)}/>
                                            <label htmlFor="remember" className="form-check-label text-muted">
                                                Ghi nhớ đăng nhập
                                            </label>
                                            <Link to={"/forgot"} className="forgot ms-4">Quên mật khẩu?</Link>
                                        </div>

                                        <button className="btn btn-primary btn-lg w-100 mt-3" type="submit">
                                            Đăng nhập
                                        </button>
                                        <div className="text-center p-3 text-muted">
                                            Bạn chưa có tài khoản?
                                            <span className="ms-2 fw-medium text-primary pointer" onClick={() => setShowLogin(false)}>
                                                <u>Đăng ký</u>
                                            </span>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            <div className="my-2 py-3 bordert text-muted"></div>
                            <div className="d-flex align-items-center justify-content-center">
                                <img className="me-3 pointer" src={icon_google} alt=""/>
                                <img className="pointer" src={icon_facebook} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;