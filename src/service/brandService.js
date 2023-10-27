import axios from "axios";

const URL_API = 'http://localhost:8080/api/brands';
const getAllBrands = () => {
    return axios.get(URL_API);
}

export {getAllBrands};