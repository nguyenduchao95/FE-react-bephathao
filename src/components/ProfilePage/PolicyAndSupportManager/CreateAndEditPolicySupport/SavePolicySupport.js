import React, {useEffect, useRef, useState} from 'react';
import {savePolicySupport} from "../../../../service/adminService";
import Swal from "sweetalert2";
import {Modal} from "react-bootstrap";
import _ from "lodash";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {policySupportSchema} from "../../../../validate/validate";
import TinyMCE from "../../ProductsManager/CreateAndEditProduct/TinyMCE";

const SavePolicySupport = ({policySupport, policySupports, showModalSavePolicySupport, setShowModalSavePolicySupport, render, setRender}) => {
    const [showTinyMCE, setShowTinyMCE] = useState(false);
    const [content, setContent] = useState("");
    const [options, setOptions] = useState([]);

    const editorRef = useRef(null);

    useEffect(() => {
        const titles = [
            'Giới thiệu',
            'Hướng dẫn mua hàng online',
            'Quy định chung',
            'Bảo mật thông tin',
            'Dịch vụ sửa chữa',
            'Giao hàng và lắp đặt',
            'Quyền lợi sau mua hàng',
            'Bảo hành và đổi sản phẩm'
        ]
        const arr = findDifferentTitle(titles, policySupports);
        if (policySupport.title) arr.push(policySupport.title);
        setOptions(arr);
        setContent(policySupport.content);
    }, [policySupport])

    const findDifferentTitle = (titles, arr) => {
      const rs = [];
      for (const title of titles){
          let check = true;
          for (const i of arr){
              if (title === i.title) {
                  check = false;
                  break;
              }
          }
          if (check) rs.push(title);
      }
      return rs;
    }

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

    const handleCloseTinyMCE = () => setShowTinyMCE(false);

    const handleSavePolicySupport = (values) => {
        const data = {...values};
        data.content = content;
        if (policySupport.id) {
            data.id = policySupport.id;
            data.createdAt = policySupport.createdAt;
        }
        savePolicySupport(data).then(response => {
            Swal.fire({
                icon: 'success',
                title: `${data.id ? 'Cập nhật' : 'Thêm'} bài viết thành công !`,
                showConfirmButton: false,
                timer: 1500
            }).then();
            setShowModalSavePolicySupport(false);
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
            show={showModalSavePolicySupport}
            onHide={() => setShowModalSavePolicySupport(false)}
            size="lg"
            centered
        >
            <div className="container p-4">
                {!_.isEmpty(policySupport) && !_.isEmpty(options) &&
                    <Formik
                        initialValues={{
                            title: policySupport.title,
                            content: policySupport.content ? "Bài viết đã được lưu. Click để sửa bài viết" : ""
                        }}
                        validationSchema={policySupportSchema}
                        onSubmit={values => {
                            handleSavePolicySupport(values);
                        }}>
                        {({values}) => (
                            <Form>
                                <div className="row">
                                    <h2 className="text-center text-uppercase mb-5 position-relative">
                                        {policySupport.id ? "Cập nhật bài viết" : "Thêm bài viết"}
                                        <span className="position-absolute top-0 end-0 fs-4 px-sm-3 pointer"
                                              onClick={() => setShowModalSavePolicySupport(false)}>
                                            <i className="bi bi-x-lg"></i>
                                        </span>
                                    </h2>
                                    <div className="mb-3 col-12">
                                        <label htmlFor="title" className="form-label">
                                            Tên bài viết <span className="text-danger">*</span>
                                        </label>
                                        <Field as="select" className="form-select" id="title" name="title">
                                            <option value="">---Vui lòng chọn---</option>
                                            {options.map((item, index) => (
                                                <option value={item} key={index}>{item}</option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="title" className="text-danger" component="small"/>
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label htmlFor="content" className="form-label">
                                            Nội dung bài viết <span className="text-danger">*</span>
                                        </label>
                                        <Field as="textarea" type="text" className="form-control" id="content"
                                               readOnly
                                               name="content" placeholder="Click để viết bài"
                                               onClick={() => setShowTinyMCE(true)}/>
                                        <ErrorMessage name="content" className="text-danger" component="small"/>
                                    </div>

                                    <div className="text-center mt-3">
                                        <button type="submit" className="btn btn-lg btn-primary me-3"
                                                style={{minWidth: '120px'}}>
                                            {policySupport.id ? "Cập nhật" : "Thêm mới"}
                                        </button>
                                        <button className="btn btn-lg btn-secondary"
                                                style={{minWidth: '120px'}} type="button"
                                                onClick={() => setShowModalSavePolicySupport(false)}>
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
                                             description={policySupport.content} isDescription={true}
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

export default SavePolicySupport;