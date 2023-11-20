import axios from "axios";

const URL_API = `http://54.254.46.3:8080/api/informations`;
const getAllInfo = () => {
    return axios.get(URL_API);
}

export {getAllInfo};