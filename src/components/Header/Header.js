import React from 'react';
import TopBar from './TopBar/TopBar';
import Navbar from './NavBar/NavBar';
import './header.scss';

const Header = () => {
    return (
        <>
            <TopBar/>
            <Navbar/>
        </>
    );
};

export default Header;