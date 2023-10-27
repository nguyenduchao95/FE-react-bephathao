const ADD_PRODUCT_CART = 'Add product in cart';
const EDIT_PRODUCT_CART = 'Edit product in cart';
const DELETE_PRODUCT_CART = 'Delete product in cart';
const EMPTY_CART = 'Empty cart';
const SAVE_ACCOUNT = 'Save account to context';
const EDIT_ACCOUNT = 'Edit account';
const DELETE_ACCOUNT = 'Delete account';

const addProductToCart = (data) => {
    return {
        type: ADD_PRODUCT_CART,
        payload: data
    }
}

const editProductCart = (data) => {
    return {
        type: EDIT_PRODUCT_CART,
        payload: data
    }
}

const deleteProductCart = (data) => {
    return {
        type: DELETE_PRODUCT_CART,
        payload: data
    }
}

const emptyCart = () => {
    return {
        type: EMPTY_CART
    }
}

const saveAccount = (account) =>{
    return {
        type: SAVE_ACCOUNT,
        payload: account
    }
}

const editAccount = (account) =>{
    return {
        type: EDIT_ACCOUNT,
        payload: account
    }
}

const deleteAccount = () =>{
    return {
        type: DELETE_ACCOUNT
    }
}

export {
    ADD_PRODUCT_CART,
    EDIT_PRODUCT_CART,
    DELETE_PRODUCT_CART,
    EMPTY_CART,
    SAVE_ACCOUNT,
    EDIT_ACCOUNT,
    DELETE_ACCOUNT,
    addProductToCart,
    editProductCart,
    deleteProductCart,
    emptyCart,
    saveAccount,
    editAccount,
    deleteAccount
};