import axios from "axios";

const URL_API = 'http://localhost:8080/api/informations';
const getAllInfo = () => {
    return axios.get(URL_API);
}

export {getAllInfo};