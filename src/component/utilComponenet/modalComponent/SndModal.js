import React, { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import Form from "../formComponent/FormComponent";
import axios from "axios";
import BASE_URL from "../../../utils/Api";



const Modal = ({ open, closeModal, data, editData,type }) => {
  const [formData,setFormData] = useState({
    label: "",
    datakey: "",
    width: "",
    align: "",
    orders: "",
  });
  const [updateFunc,setUpdateFunc] = useState(() => () => {

  });
  useEffect(()=>{
    setFormData({
      label: "",
      datakey: "",
      width: "",
      align: "",
      orders: "",
    });
    setUpdateFunc(undefined);
    if(type === "mod"){
      setFormData(editData);
      setUpdateFunc(() => () => {
        const b = "bbbb";
        console.log(b);
      })
    }
  },[editData,type])
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
        updateModalCoulmn={updateFunc}
        header="컬럼 정보 관리"
        main={
          <>
            <Form
              items={[
                { value: { name: "label", text: "컬럼명",content:formData.label}},
                { value: { name: "datakey", text: "데이터키",content:formData.datakey}},
                { value: { name: "width", text: "길이",content:formData.width}},
                { value: { name: "align", text: "정렬",content:formData.align}},
                { value: { name: "orders", text: "순서",content:formData.orders}},
              ]}
              changeForm={changeModalForm}
              readOnly={false}
            />
          </>
        }
      />
    </div>
  );
};

export default Modal;
