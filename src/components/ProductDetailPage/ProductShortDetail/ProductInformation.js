import React, {useContext, useEffect, useState} from 'react';
import icon_mess from "../../../image/icons8-messenger-60.png";
import icon_zalo from "../../../image/icons8-zalo-60.png";
import {formatCurrency} from "../../../service/format";
import {Link} from "react-router-dom";
import {ProductDetailContext} from "../ProductDetailPage";
import {averageRatingByProductId} from "../../../service/reviewService";
import StarsReview from "./StarsReview";
import _ from "lodash";
import {ShopContext} from "../../../context-reducer/context/ShopContext";
import {addProductToCart} from "../../../context-reducer/actions/actions";

const ProductInformation = () => {
    const {product, countReviews} = useContext(ProductDetailContext);
    const {dispatch} = useContext(ShopContext);
    const {price, sale} = product;
    const newPrice = price - price * sale / 100;
    const [quantityBuy, setQuantityBuy] = useState(1);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (!_.isEmpty(product)) {
            averageRatingByProductId(product.id).then(response => {
                setRating(response.data);
            }).catch(error => {
                console.log(error);
            })
        }
    }, [product])

    const handleChange = (event) => {
        const value = +event.target.value;
        setQuantityBuy(value >= product.quantity ? product.quantity : value);
    }

    const handleBuy = () => {
        const data = {product, quantity: quantityBuy};
        dispatch(addProductToCart(data));
    }

    return (
        <>
            <h3 className="fw-semibold">{product.name}</h3>
            <div className="d-flex align-items-center mb-3">
                <div className="me-2 star-review">
                    <span className={`fw-semibold me-2 fs-5 ${rating ? "" : "d-none"}`}>{rating}</span>
                    <StarsReview rating={rating}/>
                </div>
                <small>({countReviews} nhận xét)</small>
            </div>
            <h3 className="fw-normal mb-4 text-danger">
                {formatCurrency(newPrice)}
                {sale ?
                    <>
                        <span className="text-muted fs-5 ms-3">
                            <del>{formatCurrency(price)}</del>
                        </span>
                        <span className="ms-3 py-2 bg-danger text-white"
                              style={{
                                  clipPath: 'polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)',
                                  fontSize: '14px'
                              }}
                        >-{sale}%
                        </span>
                    </>
                    :
                    null
                }

            </h3>
            <p className="mb-2">Mã sản phẩm: <span className="ms-1">{product.code}</span></p>
            <p className="mb-2 d-flex">
                Danh mục:
                <Link to={`/san-pham/danh-muc/${product.category?.id}`} className="ms-1 nav-link">
                    {product.category?.name}
                </Link>
            </p>

            <p className="mb-2 d-flex">
                Hãng sản xuất:
                <Link to={`/san-pham/thuong-hieu/${product.brand?.id}`} className="ms-1 nav-link">
                    {product.brand?.name}
                </Link>
            </p>
            <p className="mb-2">Xuất xứ: <span className="ms-1">{product.origin}</span></p>
            <p className="mb-2">Bảo hành: <span className="ms-1">{product.guarantee} tháng</span></p>
            <p className="mb-2">Tồn kho: <span className="ms-1"></span>{product.quantity}</p>
            <p className="mb-2">Tình trạng: <span className="ms-1">{product.status}</span></p>

            <div className="d-flex align-items-center mb-4 pt-2">
                <div className="input-group quantity me-3" style={{width: '150px'}}>
                    <div className="input-group-btn">
                        <button className="btn btn-secondary btn-dash" style={{borderRadius: 'unset'}}
                                onClick={() => setQuantityBuy(quantityBuy > 1 ? quantityBuy - 1 : 1)}>
                            <i className="bi bi-dash-lg"></i>
                        </button>
                    </div>
                    <input className="form-control bg-gray text-center shadow-none"
                           value={quantityBuy} type="number"
                           onChange={handleChange}/>
                    <div className="input-group-btn">
                        <button className="btn btn-secondary btn-plus" style={{borderRadius: 'unset'}}
                                onClick={() => setQuantityBuy(quantityBuy >= product.quantity ? product.quantity : quantityBuy + 1)}>
                            <i className="bi bi-plus-lg"></i>
                        </button>
                    </div>
                </div>
                <Link to="/gio-hang" className="btn btn-danger px-3 py-2 btn-buy" onClick={handleBuy}>
                    <i className="bi bi-cart-plus me-2"></i>Mua ngay
                </Link>
            </div>
            <div className="d-flex align-items-center pt-3">
                <p className="text-dark fw-semibold mb-0 me-2">Chat với Bếp Hà Thảo qua:</p>
                <div className="d-inline-flex">
                    <a className="nav-link me-2" href="https://m.me/BepThaoHa">
                        <img src={icon_mess} alt='icon-mess'/>
                    </a>
                    <a className="nav-link" href="https://zalo.me/0988068286">
                        <img src={icon_zalo} alt='icon-zalo'/>
                    </a>
                </div>
            </div>
        </>
    );
};

export default ProductInformation;