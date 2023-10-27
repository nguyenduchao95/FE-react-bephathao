import axios from "axios";

const URL_API = 'http://localhost:8080/api/orders';
const createOrder = (order) => {
    return axios.post(URL_API, order);
}

export {createOrder};