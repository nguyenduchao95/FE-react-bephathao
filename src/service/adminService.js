import instance from "./axiosConfig";

const API_URL = '/api/admin';

const createProduct = (data) =>{
    return instance.post(`${API_URL}/products`, data);
}

const editProduct = (productId, data) =>{
    return instance.put(`${API_URL}/products/${productId}`, data);
}

const changeStatusProduct = (productId, status) =>{
    return instance.put(`${API_URL}/products/change-status/${productId}?status=${status}`);
}

export {
    createProduct,
    editProduct,
    changeStatusProduct
};