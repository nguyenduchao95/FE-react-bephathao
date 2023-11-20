import axios from "axios";

const URL_API = `http://54.254.46.3:8080/api/images`;
const getAllImagesByProductId = (productId) => {
    return axios.get(`${URL_API}/${productId}`);
}

export {getAllImagesByProductId}