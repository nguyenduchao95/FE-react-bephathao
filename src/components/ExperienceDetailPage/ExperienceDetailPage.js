import React, {useEffect, useState} from 'react';
import Slogan from "../ProductsPage/Slogan";
import {useParams} from "react-router-dom";
import {getExperienceByIdAndIncreaseView} from "../../service/experienceService";
import {formatDate} from "../../service/format";
import _ from "lodash";
import "./experienceDetailPage.scss";

const ExperienceDetailPage = () => {
    const [experience, setExperience] = useState({});
    const {experienceId} = useParams();
    useEffect(() => {
        if (experienceId) {
            getExperienceByIdAndIncreaseView(experienceId).then(response => {
                setExperience(response.data);
            }).catch(error => console.log(error))
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [experienceId])

    return (
        <div className="container common-detail-page">
            <Slogan/>
            {!_.isEmpty(experience) &&
                <div className="mb-5">
                    <div className="experience-title border-bottom mb-3">
                        <h4>
                            Bài viết: {experience.title}
                        </h4>
                        <p>
                            <span>
                                <i className="bi bi-alarm me-2"></i>
                                Ngày đăng: {formatDate(experience.createdAt)}
                            </span>
                            <span className="text-muted px-3">|</span>
                            <span>
                                <i className="bi bi-eye me-2"></i>
                                {experience.view} lượt xem
                            </span>
                        </p>
                    </div>
                    <div className="common-content" dangerouslySetInnerHTML={{__html: experience.content}}></div>
                </div>
            }
        </div>
    );
};

export default ExperienceDetailPage;