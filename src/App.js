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
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import AccountInformation from "./components/ProfilePage/AccountInformation/AccountInformation";
import ChangePassword from "./components/ProfilePage/ChangePassword/ChangePassword";
import PurchaseHistory from "./components/ProfilePage/PurchaseHistory/PurchaseHistory";
import ProductsManager from "./components/ProfilePage/ProductsManager/ProductsManager";
import ExperiencesPage from "./components/ExperiencesPage/ExperiencesPage";
import ExperiencesManager from "./components/ProfilePage/ExperiencesManager/ExperiencesManager";
import ExperienceDetailPage from "./components/ExperienceDetailPage/ExperienceDetailPage";
import ContactPage from "./components/ContactPage/ContactPage";
import RepairService from "./components/PolicyAndSupportPage/RepairService/RepairService";
import PolicyAndSupportPage from "./components/PolicyAndSupportPage/PolicyAndSupportPage";
import PolicyAndSupportManager from "./components/ProfilePage/PolicyAndSupportManager/PolicyAndSupportManager";
import ShoppingGuideOnline from "./components/PolicyAndSupportPage/ShoppingGuideOnline/ShoppingGuideOnline";
import GeneralRules from "./components/PolicyAndSupportPage/GeneralRules/GeneralRules";
import InformationSecurity from "./components/PolicyAndSupportPage/InformationSecurity/InformationSecurity";
import DeliveryInstallation from "./components/PolicyAndSupportPage/DeliveryInstallation/DeliveryInstallation";
import Benefit from "./components/PolicyAndSupportPage/Benefit/Benefit";
import WarrantyExchange from "./components/PolicyAndSupportPage/WarrantyExchange/WarrantyExchange";
import SearchPage from "./components/SearchPage/SearchPage";
import IntroductionPage from "./components/IntroductionPage/IntroductionPage";
import ShopInformation from "./components/ProfilePage/ShopInformation/ShopInformation";
import BannersManager from "./components/ProfilePage/BannersManager/BannersManager";
import AccountsManager from "./components/ProfilePage/AccountsManager/AccountsManager";
import ReviewsManager from "./components/ProfilePage/ReviewsManager/ReviewsManager";
import ForbiddenPage from "./components/ForbiddenPage/ForbiddenPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path='/' exact element={<HomePage/>}/>
                <Route path='/trang-chu' element={<Navigate to='/'/>}/>
                <Route path='/san-pham' element={<ProductsPage/>}/>
                <Route path='/gioi-thieu' element={<IntroductionPage/>}/>
                <Route path='/san-pham/danh-muc/:categoryId' element={<ProductsPage/>}/>
                <Route path='/san-pham/thuong-hieu/:brandId' element={<ProductsPage/>}/>
                <Route path='/san-pham/chi-tiet/:productId' element={<ProductDetailPage/>}/>
                <Route path='/kinh-nghiem-hay' element={<ExperiencesPage/>}/>
                <Route path='/kinh-nghiem-hay/:experienceId' element={<ExperienceDetailPage/>}/>
                <Route path='/lien-he' element={<ContactPage/>}/>
                <Route path='/tim-kiem' element={<SearchPage/>}/>
                <Route path='/chinh-sach-va-ho-tro/' element={<PolicyAndSupportPage/>}>
                    <Route path='huong-dan-mua-hang-online' element={<ShoppingGuideOnline/>}/>
                    <Route path='quy-dinh-chung' element={<GeneralRules/>}/>
                    <Route path='bao-mat-thong-tin' element={<InformationSecurity/>}/>
                    <Route path='dich-vu-sua-chua' element={<RepairService/>}/>
                    <Route path='giao-hang-va-lap-dat' element={<DeliveryInstallation/>}/>
                    <Route path='quyen-loi-sau-mua-hang' element={<Benefit/>}/>
                    <Route path='bao-hanh-va-doi-san-pham' element={<WarrantyExchange/>}/>
                </Route>
                <Route path='/gio-hang' element={<CartPage/>}/>
                <Route path='/thanh-toan' element={<CheckoutPage/>}/>
                <Route path='/403' element={<ForbiddenPage/>}/>
                <Route path='/*' element={<ErrorPage/>}/>
                <Route path='/tai-khoan/' element={<ProfilePage/>}>
                    <Route path="thong-tin-tai-khoan" element={<AccountInformation/>}/>
                    <Route path="doi-mat-khau" element={<ChangePassword/>}/>
                    <Route path="lich-su-mua-hang" element={<PurchaseHistory/>}/>
                    <Route path="thong-tin-shop" element={<ShopInformation/>}/>
                    <Route path="quan-ly-banner" element={<BannersManager/>}/>
                    <Route path="quan-ly-tai-khoan" element={<AccountsManager/>}/>
                    <Route path="quan-ly-danh-gia" element={<ReviewsManager/>}/>
                    <Route path="lich-su-ban-hang" element={<PurchaseHistory/>}/>
                    <Route path="quan-ly-san-pham" element={<ProductsManager/>}/>
                    <Route path="quan-ly-bai-viet" element={<ExperiencesManager/>}/>
                    <Route path="chinh-sach-va-ho-tro" element={<PolicyAndSupportManager/>}/>
                </Route>
            </Routes>
            <Contact/>
            <ScrollBackToTop/>
            <Footer/>
        </div>
    );
}

export default App;
