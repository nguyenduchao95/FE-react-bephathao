import axios from "axios";

const URL_API = 'http://localhost:8080/api/reviews';

const getAllReviewsByProductId = (productId, page = 0, size = 5) => {
    return axios.get(`${URL_API}/${productId}?page=${page}&size=${size}`);
}

const countReviewsByProductId = (productId) => {
    return axios.get(`${URL_API}/count/${productId}`);
}

const averageRatingByProductId = (productId) => {
    return axios.get(`${URL_API}/avg-rating/${productId}`);
}

export {getAllReviewsByProductId, countReviewsByProductId, averageRatingByProductId}