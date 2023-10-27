import axios from "axios";

const URL_API = 'http://localhost:8080/api/categories';
const getAllCategories = () => {
    return axios.get(URL_API);
}

export {getAllCategories};