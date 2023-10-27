import React from 'react';
import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import './profilePage.scss';

const ProfilePage = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar/>
                <Outlet/>
            </div>
        </div>
    );
};

export default ProfilePage;