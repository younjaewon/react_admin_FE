import React,{useEffect, useState} from "react";
import ModalComponent from "./ModalComponent";
import Form from "../formComponent/FormComponent";

const Modal = ({ open, closeModal, changeModalForm, addModalColumn, updateModalColumn, data, type }) => {
  if(type==="mod"){
    addModalColumn=false;
  }else if(type==="add"){
    updateModalColumn=false;
  }

  return (
    <div>
      <ModalComponent
        open={open}
        close={closeModal}
        addModalColumn={addModalColumn}
        updateModalColumn={updateModalColumn}
        header="first modal"
        main={
          <>
            <Form
              items={[
                { value: { name: "gridname", text: "그리드명", content: data.gridname}},
                { value: { name: "dataApi", text: "대이터호출API", content: data.dataApi}}
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
