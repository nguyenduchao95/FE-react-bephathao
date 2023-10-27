import instance from "./axiosConfig";

const URL_API = '/api/accounts';

const getAccountById = (id) => {
    return instance.get(`${URL_API}/${id}`);
}

const editAccountInformation = (id, data) => {
    return instance.put(`${URL_API}/information/${id}`, data);
}

const changeAccountPassword = (id, data) => {
    return instance.put(`${URL_API}/password/${id}`, data);
}

const checkPasswordById = (id, data) => {
    return instance.post(`${URL_API}/check-password/${id}`, data);
}

const getAllOrdersByAccountId = (accountId, page = 0, size = 10, data) => {
    return instance.post(`${URL_API}/${accountId}/orders?page=${page}&size=${size}`, data);
}

const getOrderDetailByOrdersId = (ordersId) => {
    return instance.get(`${URL_API}/${ordersId}/order-detail`);
}

export {
    getAccountById,
    editAccountInformation,
    changeAccountPassword,
    checkPasswordById,
    getAllOrdersByAccountId,
    getOrderDetailByOrdersId
}
