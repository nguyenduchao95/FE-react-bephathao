import axios from "axios";

const URL_API = `http://54.254.46.3:8080/api/categories`;
const getAllCategories = () => {
    return axios.get(URL_API);
}

export {getAllCategories};