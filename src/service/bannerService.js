import axios from "axios";

const URL_API = 'http://localhost:8080/api/banners';
const getAllBanners = () => {
    return axios.get(URL_API);
}

export {getAllBanners};