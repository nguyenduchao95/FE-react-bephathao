import React from 'react';
import TopBar from './TopBar';
import Navbar from './NavBar';
import './header.scss';

const Header = () => {
    return (
        <header className="h-100">
            <TopBar/>
            <Navbar/>
        </header>
    );
};

export default Header;