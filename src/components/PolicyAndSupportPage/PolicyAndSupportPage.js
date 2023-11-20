import React from 'react';
import {Outlet} from "react-router-dom";
import SideBarPS from "./SideBarPS/SideBarPS";
import Slogan from "../ProductsPage/Slogan";

const PolicyAndSupportPage = () => {
    return (
        <div className="container-fluid profile-page">
            <Slogan/>
            <div className="row">
                <SideBarPS/>
                <Outlet/>
            </div>
        </div>
    );
};

export default PolicyAndSupportPage;