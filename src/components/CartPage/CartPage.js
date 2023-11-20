import React, {useContext} from 'react';
import Slogan from "../ProductsPage/Slogan";
import {ShopContext} from "../../context-reducer/context/ShopContext";
import _ from 'lodash';
import {formatCurrency} from "../../service/format";
import {deleteProductCart, editProductCart} from "../../context-reducer/actions/actions";
import {Link} from "react-router-dom";

const CartPage = () => {
    const {carts, dispatch} = useContext(ShopContext);
    const totalPrice = carts.reduce((total, item) => total + (item.product.price - item.product.price * item.product.sale / 100) * item.quantity, 0);

    const handleSubtraction = (product, quantity) => {
        const data = {
            product,
            quantity: quantity > 1 ? quantity - 1 : 1
        }
        dispatch(editProductCart(data));
    }

    const handleAddition = (product, quantity) => {
        const maxQuantity = product.quantity;
        const data = {
            product,
            quantity: quantity < maxQuantity ? quantity + 1 : maxQuantity
        }
        dispatch(editProductCart(data));
    }

    const handleDelete = (product) => {
        dispatch(deleteProductCart({product}));
    }
    return (
        <div>
            <Slogan/>

            <div className="container-fluid">
                <div className="row px-xl-5 mt-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        <table className="table table-bordered text-center mb-0">
                            <thead className="bg-secondary text-dark py-3 align-middle">
                            <tr>
                                <th style={{padding: '12px 4px'}}>STT</th>
                                <th style={{padding: '12px'}}>Sản phẩm</th>
                                <th style={{padding: '12px'}}>Giá</th>
                                <th style={{padding: '12px'}}>Số lượng</th>
                                <th style={{padding: '12px'}}>Tổng tiền</th>
                                <th style={{padding: '12px'}}>Xóa</th>
                            </tr>
                            </thead>
                            <tbody className="align-middle">
                            {!_.isEmpty(carts) ? carts.map((cart, index) => {
                                    const newPrice = cart.product.price - cart.product.price * cart.product.sale / 100;
                                    return (
                                        <tr key={cart.product.id}>
                                            <td className="align-middle">{index + 1}</td>
                                            <td className="text-start">
                                                <img src={cart.product?.avatar} alt="" style={{width: '50px'}}
                                                     className="me-2 d-none d-md-inline"/>
                                                {cart.product?.name}
                                            </td>
                                            <td className="align-middle">
                                                {formatCurrency(newPrice)}
                                            </td>
                                            <td className="align-middle">
                                                <div className="input-group quantity mx-auto" style={{width: '100px'}}>
                                                    <div className="input-group-btn">
                                                        <button className="btn btn-sm btn-secondary btn-dash"
                                                                style={{borderRadius: 'unset'}}
                                                                onClick={() => handleSubtraction(cart.product, cart.quantity)}>
                                                            <i className="bi bi-dash-lg"></i>
                                                        </button>
                                                    </div>
                                                    <input type="number"
                                                           className="form-control form-control-sm bg-gray text-center shadow-none"
                                                           value={cart.quantity}
                                                           readOnly={true}/>
                                                    <div className="input-group-btn">
                                                        <button className="btn btn-sm btn-secondary btn-plus"
                                                                style={{borderRadius: 'unset'}}
                                                                onClick={() => handleAddition(cart.product, cart.quantity)}>
                                                            <i className="bi bi-plus-lg"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">{formatCurrency(newPrice * cart.quantity)}</td>
                                            <td className="align-middle">
                                                <button className="btn btn-sm btn-danger"
                                                        onClick={() => handleDelete(cart.product)}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan="6" className="text-danger">Chưa có sản phẩm trong giỏ hàng !</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-4">
                        <div className="input-group mb-5">
                            <input type="text" className="form-control form-control-lg" placeholder="Mã giảm giá"/>
                            <button className="btn btn-primary ms-3">Áp mã</button>
                        </div>
                        <div className="card border-gray mb-5">
                            <div className="card-header bg-gray border-bottom-gray py-3">
                                <h4 className="fw-semibold m-0">Giỏ hàng</h4>
                            </div>
                            <div className="card-body border-bottom-gray">
                                <div className="d-flex justify-content-between mb-3 pt-1">
                                    <h6 className="fw-medium">Tổng tiền:</h6>
                                    <h6 className="fw-medium">{formatCurrency(totalPrice)}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="fw-medium">Phí ship:</h6>
                                    <h6 className="fw-medium">0 ₫</h6>
                                </div>
                            </div>
                            <div className="card-footer border-0 bg-gray">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5 className="fw-bold">Thành tiền</h5>
                                    <h5 className="fw-bold">{formatCurrency(totalPrice)}</h5>
                                </div>
                                <Link to="/thanh-toan" className="btn btn-primary btn-checkout w-100 my-4 py-3 fs-5">Thanh
                                    toán</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;