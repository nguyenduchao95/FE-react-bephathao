import axios from "axios";

const URL_API = `http://54.254.46.3:8080/api/login-register`;
const checkUsername = (account) => {
    return axios.post(`${URL_API}/check-username`, account);
}

const checkEmail = (account) => {
    return axios.post(`${URL_API}/check-email`, account);
}

const login = (account) =>{
    return axios.post(`${URL_API}/login`, account);
}

const register = (account) =>{
    return axios.post(`${URL_API}/register`, account);
}

export {checkUsername, login, register, checkEmail};