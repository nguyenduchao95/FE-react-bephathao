import axios from "axios";

const URL_API = 'http://localhost:8080/api/images';
const getAllImagesByProductId = (productId) => {
    return axios.get(`${URL_API}/${productId}`);
}

export {getAllImagesByProductId}