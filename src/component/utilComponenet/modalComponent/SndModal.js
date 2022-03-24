import React, { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import Form from "../formComponent/FormComponent";
import axios from "axios";
import BASE_URL from "../../../utils/Api";



const Modal = ({ open, closeModal, data }) => {
  const [formData,setFormData] = useState({});
  const changeModalForm = (e) => {
    const gridIdx = data.indexNo;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      gridIdx:gridIdx,
      haveChild:"N"});
  }
  const addModalColumn = (e) => {
    let newFormData = new FormData();
    console.log(formData);
    newFormData.append(
      "newFormData",
      new Blob(
        [
          JSON.stringify(formData),
        ],{
          type:"application/json",
        }
      )
    );
    axios
    .post(BASE_URL + "/searchGridColumn",newFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
    .then((response) => {
        console.log(response.data);
    });
  }
  return (
    <div>
      <ModalComponent
        open={open}
        close={closeModal}
        addModalColumn={addModalColumn}
        header="Second modal"
        main={
          <>
            <Form
              items={[
                { value: { name: "label", text: "컬럼명"}},
                { value: { name: "datakey", text: "데이터키"}},
                { value: { name: "width", text: "길이"}},
                { value: { name: "align", text: "정렬"}},
                { value: { name: "orders", text: "순서"}},
              ]}
              changeForm={changeModalForm}
              readOnly={true}
            />
          </>
        }
      />
    </div>
  );
};

export default Modal;
