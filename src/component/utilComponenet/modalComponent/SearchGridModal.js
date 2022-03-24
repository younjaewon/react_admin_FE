import React from "react";
import ModalComponent from "./ModalComponent";
import Form from "../formComponent/FormComponent";

const Modal = ({ open, closeModal, changeModalForm, addModalColumn, data }) => {
  return (
    <div>
      <ModalComponent
        open={open}
        close={closeModal}
        addModalColumn={addModalColumn}
        header="first modal"
        main={
          <>
            <Form
              items={[
                { value: { name: "gridname", text: "그리드명"}},
                { value: { name: "dataApi", text: "대이터호출API"}}
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
