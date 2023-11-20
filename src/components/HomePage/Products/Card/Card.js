import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {formatCurrency} from "../../../../service/format";
import {ShopContext} from "../../../../context-reducer/context/ShopContext";
import {addProductToCart} from "../../../../context-reducer/actions/actions";
import Swal from "sweetalert2";
import "./card.scss";

const Card = ({product}) => {
    const {id, price, sale, avatar, name} = product;
    const newPrice = price - price * sale / 100;
    const {dispatch} = useContext(ShopContext);

    const handleAddToCart = () => {
        const data = {product, quantity: 1};
        dispatch(addProductToCart(data));
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
        Toast.fire({
            icon: "success",
            title: "Đã thêm vào giỏ hàng !"
        }).then();
    }
    return (
        <div className="col-lg-3 col-md-6 col-12 pb-1">
            <div className="card product-item border-0 mb-5">
                <Link to={`/san-pham/chi-tiet/${id}`} className="product-link">
                    <div
                        className="card-header product-img position-relative overflow-hidden bg-transparent border p-0 text-center">
                        <img className="img-fluid" src={avatar} alt="" style={{aspectRatio: '1/1'}}/>
                        {sale ?
                            <span
                                className='position-absolute top-0 end-0 bg-danger px-3 py-2 px-lg-2 py-lg-1 text-white rounded-start'>
                                -{sale}%
                            </span>
                            :
                            null
                        }
                    </div>
                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h6 className="text-truncate mb-3 product-name">{name}</h6>
                        <div className="d-flex justify-content-center align-items-center">
                            <i className="bi bi-cash me-2 icon-cash"></i>
                            <h6 className="m-0">{formatCurrency(newPrice)}</h6>
                            {sale ?
                                <h6 className="text-muted ms-2 my-0">
                                    <del>{formatCurrency(price)}</del>
                                </h6>
                                :
                                null
                            }
                        </div>
                    </div>
                </Link>
                <div className="card-footer d-flex justify-content-between bg-light border">
                    <Link to={`/san-pham/chi-tiet/${id}`} className="btn btn-sm text-dark p-0 product-detail">
                        <i className="bi bi-eye text-primary me-2"></i>
                        Chi tiết
                    </Link>
                    <div className="btn btn-sm text-dark p-0 product-detail"
                       onClick={handleAddToCart}>
                        <i className="bi bi-cart-plus me-2 text-primary"></i>
                        Mua hàng
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;