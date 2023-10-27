import {
    ADD_PRODUCT_CART, DELETE_ACCOUNT,
    DELETE_PRODUCT_CART,
    EDIT_ACCOUNT,
    EDIT_PRODUCT_CART,
    EMPTY_CART,
    SAVE_ACCOUNT
} from "../actions/actions";

export const initialState = {
    carts: [],
    account: JSON.parse(localStorage.getItem("account-bephathao")) ?
        JSON.parse(localStorage.getItem("account-bephathao")) :
        {}
};

const reducer = (state, action) => {
    const newCarts = [...state.carts];
    let product, quantity, index, account;
    if (action && action.payload) {
        product = action.payload.product;
        quantity = action.payload.quantity;
        index = state.carts.findIndex(item => item.product.id === product.id);
        account = action.payload;
    }

    switch (action.type) {
        case ADD_PRODUCT_CART:
            if (index >= 0) {
                const maxQuantity = product.quantity;
                const newQuantity = newCarts[index].quantity + quantity;
                newCarts[index].quantity = newQuantity < maxQuantity ? newQuantity : maxQuantity;
            } else
                newCarts.push({product, quantity});
            return {...state, carts: newCarts};
        case EDIT_PRODUCT_CART:
            if (index >= 0)
                newCarts[index].quantity = quantity;
            return {...state, carts: newCarts};
        case DELETE_PRODUCT_CART:
            if (index >= 0)
                newCarts.splice(index, 1);
            return {...state, carts: newCarts};
        case EMPTY_CART:
            return {...state, carts: []};
        case SAVE_ACCOUNT:
            return {...state, account};
        case EDIT_ACCOUNT:
            return {...state, account};
        case DELETE_ACCOUNT:
            return {...state, account: {}};
        default:
            throw new Error("Invalid action");
    }
}

export default reducer;