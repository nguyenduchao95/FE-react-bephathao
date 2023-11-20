import axios from "axios";

const URL_API = `http://54.254.46.3:8080/api/experiences`;
const getAllExperiences = (data, page = 0, size = 10) => {
    return axios.post(`${URL_API}?page=${page}&size=${size}`, data);
}

const getExperienceByIdAndIncreaseView = (experienceId) => {
    return axios.get(`${URL_API}/${experienceId}`);
}

export {
    getAllExperiences,
    getExperienceByIdAndIncreaseView
};