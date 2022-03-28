import React, { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import Form from "../formComponent/FormComponent";
import axios from "axios";
import BASE_URL from "../../../utils/Api";



const Modal = ({ open, closeModal, data, editData,type,getGridList}) => {
  const [formData,setFormData] = useState({
    label: "",
    datakey: "",
    width: "",
    align: "",
    orders: "",
  });
  useEffect(()=>{
    setFormData({...editData});
  },[editData])
  const updateFunc = () => {
    if(type === "mod"){

      console.log(formData);
      const updateChk = window.confirm("수정하시겠습니까?");
      if(updateChk){
        const indexNo = editData.indexNo;
        const modFormData = {...formData,indexNo:indexNo};
        axios.put(BASE_URL + "/searchGridColumn",
                modFormData)
                .then((resource) => {
                  console.log("test");
                  closeModal();
                  getGridList();
                })
      }
    }
  }
  const insertFunc = () => {
    if(type=== "add"){
      console.log(formData);
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
            closeModal();
            getGridList();
          });
    }
  }

  const changeModalForm = (e) => {
    const gridIdx = data.indexNo;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      gridIdx:gridIdx,
      haveChild:"N"});
    console.log(formData);
  }
  return (
    <div>
      <ModalComponent
        open={open}
        close={closeModal}
        addModalColumn={insertFunc}
        updateModalColumn={updateFunc}
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
