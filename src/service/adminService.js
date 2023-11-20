import instance from "./axiosConfig";

const API_URL = '/api/admin';

const createProduct = (data) => {
    return instance.post(`${API_URL}/products`, data);
}

const editProduct = (productId, data) => {
    return instance.put(`${API_URL}/products/${productId}`, data);
}

const changeStatusProduct = (productId, status) => {
    return instance.put(`${API_URL}/products/change-status/${productId}?status=${status}`);
}

const saveExperience = (data) => {
    return instance.post(`${API_URL}/experiences`, data);
}

const deleteExperience = (experienceId) => {
    return instance.delete(`${API_URL}/experiences/${experienceId}`);
}

const savePolicySupport = (data) => {
    return instance.post(`${API_URL}/policy-support`, data);
}

const deletePolicySupport = (policySupportId) => {
    return instance.delete(`${API_URL}/policy-support/${policySupportId}`);
}

const getAllOrders = (data, page = 0, size = 10) => {
    return instance.post(`${API_URL}/orders?page=${page}&size=${size}`, data);
}

const changeStatusOrder = (data) => {
    return instance.post(`${API_URL}/orders/change-status`, data);
}

const saveInformation = (data) => {
    return instance.post(`${API_URL}/information`, data);
}

const saveBanner = (data) => {
    return instance.post(`${API_URL}/banners`, data);
}

const deleteBanner = (bannerId) => {
    return instance.delete(`${API_URL}/banners/${bannerId}`);
}

const getAllAccounts = (data, page = 0, size = 10) => {
    return instance.post(`${API_URL}/accounts?page=${page}&size=${size}`, data);
}

const blockAccount = (accountId) => {
    return instance.put(`${API_URL}/accounts/block/${accountId}`);
}

const unBlockAccount = (accountId) => {
    return instance.put(`${API_URL}/accounts/unblock/${accountId}`);
}

const getAllReviews = (data, page = 0, size = 10) => {
    return instance.post(`${API_URL}/reviews?page=${page}&size=${size}`, data);
}

const confirmReview = (reviewId) => {
    return instance.put(`${API_URL}/reviews/${reviewId}`);
}

const deleteReview = (reviewId) => {
    return instance.delete(`${API_URL}/reviews/${reviewId}`);
}

export {
    createProduct,
    editProduct,
    changeStatusProduct,
    saveExperience,
    deleteExperience,
    savePolicySupport,
    deletePolicySupport,
    getAllOrders,
    changeStatusOrder,
    saveInformation,
    saveBanner,
    deleteBanner,
    getAllAccounts,
    blockAccount,
    unBlockAccount,
    getAllReviews,
    confirmReview,
    deleteReview
};