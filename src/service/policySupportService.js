import axios from "axios";

const URL_API = `http://54.254.46.3:8080/api/policy-support`;
const getAllPolicySupports = () => {
    return axios.get(URL_API);
}

const getPolicySupportByTitle = (data) => {
    return axios.post(URL_API, data);
}

export {
    getAllPolicySupports,
    getPolicySupportByTitle
};