import axios from "axios";

const URL_API = `http://54.254.46.3:8080/api/orders`;
const createOrder = (order) => {
    return axios.post(URL_API, order);
}

export {createOrder};