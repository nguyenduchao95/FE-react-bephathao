import axios from "axios";

const URL_API = 'http://localhost:8080/api/products';
const getAllProducts = (page = 0, size = 8) => {
    return axios.get(`${URL_API}?page=${page}&size=${size}`);
}

const getProductById = (productId) => {
    return axios.get(`${URL_API}/${productId}`);
}

const getAllProductsByCategory = (categoryId, productId = 0, page = 0, size = 8) => {
    return axios.get(`${URL_API}/categories/${categoryId}?productId=${productId}&page=${page}&size=${size}`);
}

const filterProducts = (categoryIds, brandIds, prices, sortBy = 'default', page = 0, size = 12, nameSearch = '', status = '') => {
    return axios.get(`${URL_API}/filter?categoryIds=${categoryIds.join(',')}&brandIds=${brandIds.join(',')}&min=${prices[0]}&max=${prices[1]}&sortBy=${sortBy}&page=${page}&size=${size}&nameSearch=${nameSearch}&status=${status}`);
}

export {getAllProducts, getProductById, getAllProductsByCategory, filterProducts};