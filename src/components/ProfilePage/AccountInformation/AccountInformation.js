import React, {useContext, useEffect, useState} from 'react';
import image_default from '../../../image/user-image.png';
import {ShopContext} from "../../../context-reducer/context/ShopContext";
import {getAccountById} from "../../../service/accountService";
import EditAccountInformation from "./EditAccountInformation";
import _ from "lodash";
import {formatDate} from "../../../service/format";

const AccountInformation = () => {
    const [accountInfo, setAccountInfo] = useState({});
    const [showModal, setShowModal] = useState(false);
    const {account} = useContext(ShopContext);

    useEffect(() => {
        getAccountById(account.id).then(response => {
            setAccountInfo(response.data);
        }).catch(error => {
            console.log(error)
        })
    }, [account])
    const handleShowModal = () => {
        setShowModal(true);
    };
    return (
        <div className="col-12 col-lg-9">
            <h2 className="text-center mb-4 text-uppercase mb-5">Thông tin cá nhân</h2>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <div className="d-flex flex-column align-items-center text-center px-3">
                        <span className="mb-2 fw-medium">Ảnh đại diện</span>
                        <img className="img-fluid rounded-circle" width={200}
                             src={accountInfo.avatar ? accountInfo.avatar : image_default} alt="" id="image"/>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item py-3">
                                <span className="mb-2 fw-medium">Tên đăng nhập:</span> {account.username}
                            </li>
                            <li className="list-group-item py-3">
                                <span className="mb-2 fw-medium">Họ và tên:</span> {accountInfo.lastName ? `${accountInfo.lastName} ${accountInfo.firstName}` : 'Chưa có thông tin'}
                            </li>
                            <li className="list-group-item py-3">
                                <span className="mb-2 fw-medium">Ngày sinh:</span> {accountInfo.dateOfBirth ? formatDate(accountInfo.dateOfBirth) : 'Chưa có thông tin'}
                            </li>
                            <li className="list-group-item py-3">
                                <span className="mb-2 fw-medium">Địa chỉ:</span> {accountInfo.address ? accountInfo.address : 'Chưa có thông tin'}
                            </li>
                            <li className="list-group-item py-3">
                                <span className="mb-2 fw-medium">Email:</span> {accountInfo.email}
                            </li>
                            <li className="list-group-item py-3">
                                <span className="mb-2 fw-medium">Số điện thoại:</span> {accountInfo.phoneNumber ? accountInfo.phoneNumber : 'Chưa có thông tin'}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-3 text-center">
                    <button className="btn btn-lg btn-primary" onClick={handleShowModal}>
                        Sửa thông tin
                    </button>
                </div>

                {!_.isEmpty(accountInfo) && showModal &&
                    <EditAccountInformation accountInfo={accountInfo} showModal={showModal} setShowModal={setShowModal}/>
                }
            </div>
        </div>
    );
};

export default AccountInformation;