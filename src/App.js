import './App.scss';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import {Route, Routes, Navigate} from "react-router-dom";
import ScrollBackToTop from "./components/ScrollBackToTop/ScrollBackToTop";
import Contact from "./components/Contact/Contact";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import ProductDetailPage from "./components/ProductDetailPage/ProductDetailPage";
import CartPage from "./components/CartPage/CartPage";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import AccountInformation from "./components/ProfilePage/AccountInfomation/AccountInformation";
import ChangePassword from "./components/ProfilePage/ChangePassword/ChangePassword";
import PurchaseHistory from "./components/ProfilePage/PurchaseHistory/PurchaseHistory";
import SaveProduct from "./components/ProfilePage/ProductsManager/CreateAndEditProduct/SaveProduct";
import ProductsManager from "./components/ProfilePage/ProductsManager/ProductsManager";

function App() {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path='/' exact element={<HomePage/>}/>
                <Route path='/trang-chu' element={<Navigate to='/'/>}/>
                <Route path='/san-pham' element={<ProductsPage/>}/>
                <Route path='/san-pham/danh-muc/:categoryId' element={<ProductsPage/>}/>
                <Route path='/san-pham/thuong-hieu/:brandId' element={<ProductsPage/>}/>
                <Route path='/san-pham/chi-tiet/:productId' element={<ProductDetailPage/>}/>
                <Route path='/gio-hang' element={<CartPage/>}/>
                <Route path='/thanh-toan' element={<CheckoutPage/>}/>
                <Route path='/tai-khoan/' element={<ProfilePage/>}>
                    <Route path="thong-tin" element={<AccountInformation/>}/>
                    <Route path="doi-mat-khau" element={<ChangePassword/>}/>
                    <Route path="lich-su-mua-hang" element={<PurchaseHistory/>}/>
                    <Route path="quan-ly-san-pham" element={<ProductsManager/>}/>
                </Route>
            </Routes>
            <Contact/>
            <ScrollBackToTop/>
            <ToastContainer autoClose={2000}/>
            <Footer/>
        </div>
    );
}

export default App;
