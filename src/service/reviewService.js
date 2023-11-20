import axios from "axios";

const URL_API = `http://54.254.46.3:8080/api/reviews`;

const getAllReviewsByProductId = (productId, page = 0, size = 5) => {
    return axios.get(`${URL_API}/${productId}?page=${page}&size=${size}`);
}

const countReviewsByProductId = (productId) => {
    return axios.get(`${URL_API}/count/${productId}`);
}

const averageRatingByProductId = (productId) => {
    return axios.get(`${URL_API}/avg-rating/${productId}`);
}

const createReview = (data) => {
    return axios.post(URL_API, data);
}

export {
    getAllReviewsByProductId,
    countReviewsByProductId,
    averageRatingByProductId,
    createReview
}