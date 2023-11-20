import axios from "axios";

const URL_API = `http://54.254.46.3:8080/api/products`;
const getAllProducts = (page = 0, size = 8) => {
    return axios.get(`${URL_API}?page=${page}&size=${size}`);
}

const getProductById = (productId) => {
    return axios.get(`${URL_API}/${productId}`);
}

const getAllProductsByCategory = (categoryId, productId = 0, page = 0, size = 8) => {
    return axios.get(`${URL_API}/categories/${categoryId}?productId=${productId}&page=${page}&size=${size}`);
}

const filterProducts = (data, page = 0, size = 12) => {
    return axios.post(`${URL_API}/filter?page=${page}&size=${size}`, data);
}

export {getAllProducts, getProductById, getAllProductsByCategory, filterProducts};