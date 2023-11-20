import React, {useEffect, useRef, useState} from 'react';
import _ from "lodash";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {experienceSchema} from "../../../../validate/validate";
import AvatarUpload from "../../AccountInformation/Avatar/AvatarUpload";
import {Modal} from "react-bootstrap";
import TinyMCE from "../../ProductsManager/CreateAndEditProduct/TinyMCE";
import {saveExperience} from "../../../../service/adminService";
import Swal from "sweetalert2";

const SaveExperience = ({experience, showModalSaveExperience, setShowModalSaveExperience, render, setRender}) => {
    const [showTinyMCE, setShowTinyMCE] = useState(false);
    const [avatarURL, setAvatarURL] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);
    const [content, setContent] = useState("");

    const avatarRef = useRef();
    const editorRef = useRef(null);

    useEffect(() => {
        setAvatarURL(experience.avatar);
        setContent(experience.content);
    }, [experience])

    const handleCloseTinyMCE = () => setShowTinyMCE(false);

    const handleSaveTinyMCE = (values) => {
        if (!editorRef.current) return;
        if (editorRef.current.getContent()) {
            values.content = "Bài viết đã được lưu. Click để sửa bài viết";
            setContent(editorRef.current.getContent());
        } else {
            values.content = "";
            setContent("");
        }
        handleCloseTinyMCE();
    };

    const handleAvatarFile = (event, values) => {
        values.avatar = 'is valid';
        setAvatarFile(event.target.files[0]);
        if (avatarRef) avatarRef.current.value = null;
    }

    const handleSaveExperience = (values) => {
        const data = {...values};
        data.content = content;
        data.avatar = avatarURL;
        if (experience.id) {
            data.id = experience.id;
            data.createdAt = experience.createdAt;
            data.view = experience.view;
        }
        saveExperience(data).then(response => {
            Swal.fire({
                icon: 'success',
                title: `${data.id ? 'Cập nhật' : 'Thêm'} bài viết thành công !`,
                showConfirmButton: false,
                timer: 1500
            }).then();
            setShowModalSaveExperience(false);
            setRender(!render);
        }).catch(error => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: `${data.id ? 'Cập nhật' : 'Thêm'} bài viết thất bại !`,
                showConfirmButton: false,
                timer: 1500
            }).then();
        })
    }

    return (
        <Modal
            show={showModalSaveExperience}
            onHide={() => setShowModalSaveExperience(false)}
            size="lg"
            centered
        >
            <div className="container p-4">
                {!_.isEmpty(experience) &&
                    <Formik
                        initialValues={{
                            title: experience.title,
                            content: experience.content ? "Bài viết đã được lưu. Click để sửa bài viết" : "",
                            avatar: experience.avatar ? "is valid" : "",
                        }}
                        validationSchema={experienceSchema}
                        onSubmit={values => {
                            handleSaveExperience(values);
                        }}>
                        {({values}) => (
                            <Form>
                                <div className="row">
                                    <h2 className="text-center text-uppercase mb-5 position-relative">
                                        {experience.id ? "Cập nhật bài viết" : "Thêm bài viết"}
                                        <span className="position-absolute top-0 end-0 fs-4 px-sm-3 pointer"
                                              onClick={() => setShowModalSaveExperience(false)}>
                                            <i className="bi bi-x-lg"></i>
                                        </span>
                                    </h2>
                                    <div className="mb-3 col-lg-6 col-sm-12">
                                        <label htmlFor="title" className="form-label">
                                            Tiêu đề bài viết <span className="text-danger">*</span>
                                        </label>
                                        <Field as="textarea" type="text" className="form-control" id="title"
                                               placeholder="Nhập tiêu đề bài viết"
                                               name="title"/>
                                        <ErrorMessage name="title" className="text-danger" component="small"/>
                                    </div>

                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="content" className="form-label">
                                            Nội dung bài viết <span className="text-danger">*</span>
                                        </label>
                                        <Field as="textarea" type="text" className="form-control" id="content"
                                               readOnly
                                               name="content" placeholder="Click để viết bài"
                                               onClick={() => setShowTinyMCE(true)}/>
                                        <ErrorMessage name="content" className="text-danger" component="small"/>
                                    </div>

                                    <div className="col-lg-6 mb-3">
                                        <div className="row">
                                            <div className="col-12">
                                                <label htmlFor="avatar" className="form-label">
                                                    Ảnh đại diện <span className="text-danger">*</span>
                                                </label>
                                                <input type="file" className="form-control" id="avatar" name="avatar"
                                                       ref={avatarRef} accept="image/png, image/jpeg"
                                                       onChange={(event) => handleAvatarFile(event, values)}/>
                                                <ErrorMessage name="avatar" className="text-danger" component="small"/>
                                            </div>
                                            <div className="col-12">
                                                <AvatarUpload file={avatarFile} setAvatarFile={setAvatarFile}
                                                              setAvatarURL={setAvatarURL} avatarURL={avatarURL}
                                                              values={values}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center mt-3">
                                        <button type="submit" className="btn btn-lg btn-primary me-3"
                                                style={{minWidth: '120px'}}>
                                            {experience.id ? "Cập nhật" : "Thêm mới"}
                                        </button>
                                        <button className="btn btn-lg btn-secondary"
                                                style={{minWidth: '120px'}} type="button"
                                                onClick={() => setShowModalSaveExperience(false)}>
                                            Hủy
                                        </button>
                                    </div>
                                </div>

                                <Modal
                                    show={showTinyMCE}
                                    onHide={handleCloseTinyMCE}
                                    fullscreen={true}
                                    centered
                                >
                                    <TinyMCE editorRef={editorRef} handleSaveTinyMCE={handleSaveTinyMCE}
                                             description={experience.content} isDescription={true}
                                             values={values} handleClose={handleCloseTinyMCE}/>
                                </Modal>
                            </Form>
                        )}
                    </Formik>
                }
            </div>
        </Modal>
    );
};

export default SaveExperience;