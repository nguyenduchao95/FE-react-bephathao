import React, {useEffect, useState} from 'react';
import Slogan from "../ProductsPage/Slogan";
import "./experiencesPage.scss";
import {Spinner} from "react-bootstrap";
import {getAllExperiences} from "../../service/experienceService";
import _ from "lodash";
import {Pagination} from "@mui/material";
import {formatDate} from "../../service/format";
import {Link} from "react-router-dom";

const ExperiencesPage = () => {
    const [experiences, setExperiences] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sortBy, setSortBy] = useState("createdAt-desc");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const data = {sortBy};
        getAllExperiences(data).then(response => {
            setExperiences(response.data.content);
            setTotalPages(response.data.totalPages);
            setIsLoading(false);
        }).catch(error => {
            console.log(error);
            setIsLoading(true);
        })
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [currentPage, sortBy])

    const changePage = (event, value) => {
        setCurrentPage(value)
    }

    return (
        <div className="container experience-page pb-4">
            <Slogan/>

            <div className="mb-4">
                <span className="me-2 fw-medium d-block d-sm-inline mb-2">Sắp xếp theo: </span>
                <button className={`btn border-secondary mb-2 ${sortBy === 'createdAt-desc' ? 'active' : ''}`}
                        onClick={() => setSortBy("createdAt-desc")}>
                    <i className="bi bi-sort-up me-2"></i>Mới nhất
                </button>
                <button className={`btn border-secondary mb-2 mx-2 ${sortBy === 'createdAt-asc' ? 'active' : ''}`}
                        onClick={() => setSortBy("createdAt-asc")}>
                    <i className="bi bi-sort-up-alt me-2"></i>Cũ nhất
                </button>
                <button className={`btn border-secondary mb-2 ${sortBy === 'view-desc' ? 'active' : ''}`}
                        onClick={() => setSortBy("view-desc")}>
                    <i className="bi bi-emoji-heart-eyes me-2"></i>Lượt xem nhiều
                </button>
            </div>

            <div className="experience-list">
                {isLoading ?
                    <div className="text-center mt-5">
                        <Spinner animation="border" variant="primary"/>
                    </div>
                    :
                    !_.isEmpty(experiences) ?
                        experiences.map((item, index) => (
                            <Link to={`/kinh-nghiem-hay/${item.id}`} className="custom-link" key={item.id}>
                                <div className="row">
                                    <div className="col-12 col-md-3 text-center mb-3">
                                        <img src={item.avatar} className="img-thumbnail" alt=""
                                             style={{aspectRatio: '4/3'}}/>
                                    </div>
                                    <div className="col-12 col-md-9 post">
                                        <h5 className="title">{item.title}</h5>
                                        <p className="content" dangerouslySetInnerHTML={{__html: item.content}}></p>
                                        <div>
                                        <span>
                                            <i className="bi bi-alarm me-2"></i>
                                            {formatDate(item.createdAt)}
                                        </span>
                                        <span className="text-muted px-3">|</span>
                                        <span>
                                            <i className="bi bi-eye me-2"></i>
                                            {item.view} lượt xem
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-4 text-secondary"/>
                            </Link>
                        ))
                        :
                        <div className="text-center text-danger fs-5 mt-5">
                            Không có bài viết về kinh nghiệm hay
                        </div>
                }
            </div>
            {totalPages ?
                <div className="mt-5 d-flex justify-content-center">
                    <Pagination count={totalPages} size="large" variant="outlined" shape="rounded"
                                onChange={changePage} color="primary"/>
                </div>
                :
                null
            }
        </div>
    );
};

export default ExperiencesPage;