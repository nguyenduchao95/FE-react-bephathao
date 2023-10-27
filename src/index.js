import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import ShopProvider from "./context-reducer/context/ShopContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ShopProvider>
            <App/>
        </ShopProvider>
    </BrowserRouter>
);
