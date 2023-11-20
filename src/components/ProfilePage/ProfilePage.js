import React, {useContext, useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import './profilePage.scss';
import {ShopContext} from "../../context-reducer/context/ShopContext";
import _ from "lodash";

const ProfilePage = () => {
    const {account} = useContext(ShopContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (_.isEmpty(account)) {
            navigate("/403");
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [account])

    return (
        <div className="container-fluid position-relative profile-page">
            <div className="row">
                <Sidebar/>
                <Outlet/>
            </div>
        </div>
    );
};

export default ProfilePage;