import React, {useContext, useEffect, useState} from 'react';
import _ from "lodash";
import {getAllReviewsByProductId} from "../../../service/reviewService";
import {ProductDetailContext} from "../ProductDetailPage";
import {formatDate} from "../../../service/format";

const Comment = () => {
    const {product} = useContext(ProductDetailContext);
    const [reviews, setReviews] = useState({});
    const [size, setSize] = useState(5)

    useEffect(() => {
        if (!_.isEmpty(product)) {
            getAllReviewsByProductId(product.id, 0, size).then(response => {
                setReviews(response.data)
                console.log(response.data)
            }).catch(error => {
                console.log(error);
            })
        }
    }, [product, size])

    return (
        <>
            {!_.isEmpty(reviews) && !reviews.empty ? reviews.content.map(review => (
                    <div className="d-flex align-items-start mb-4" key={review.id}>
                        <img src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png" alt=""
                             className="img-fluid me-3 mt-1"
                             style={{width: '45px'}}/>
                        <div className="flex-grow-1">
                            <h6>{review.username}<small><i
                                className="fw-normal ms-1">({formatDate(review.createdAt)})</i></small></h6>
                            <div className="text-warning mb-2">
                                <small className="bi bi-star-fill"></small>
                                <small className="bi bi-star-fill"></small>
                                <small className="bi bi-star-fill"></small>
                                <small className="bi bi-star-fill"></small>
                                <small className="bi bi-star-fill"></small>
                            </div>
                            <p>{review.comment}</p>
                        </div>
                    </div>
                ))
                :
                <h5 className="text-center text-danger fw-normal">Chưa có nhận xét</h5>
            }

            <div className={`text-center ${size < reviews?.totalElements ? "" : "d-none"}`} onClick={() => setSize(size + 5)}>
                <button className="btn border-primary text-primary">Xem thêm</button>
            </div>
        </>
    );
};

export default Comment;