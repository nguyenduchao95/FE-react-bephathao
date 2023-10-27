import React, {useState} from 'react';
import './backToTop.scss';

const ScrollBackToTop = () => {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        setVisible(scrolled > window.innerHeight)
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <button className={`btn btn-primary back-to-top ${visible ? "d-block" : "d-none"}`} onClick={scrollToTop}>
            <i className="bi bi-arrow-up-square"></i>
        </button>
    )
};

export default ScrollBackToTop;