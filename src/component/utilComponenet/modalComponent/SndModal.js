import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import Form from "../formComponent/FormComponent";

const Modal = ({ open, closeModal, addModalColumn, data }) => {
  const companyIdx = data.companyIdx;
  const [formData,setFormData] = useState({companyIdx});
  const changeModalForm = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});
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
