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
        header="secund modal"
        main={
          <>
            <Form
              items={[
                { value: { name: "comCd", text: "회사코드"}},
                { value: { name: "userName", text: "유저명"}},
                { value: { name: "logDay", text: "발생일"}},
                { value: { name: "logTime", text: "발생시"}},
                { value: { name: "message", text: "예외 메세지"}},
                { value: { name: "requestUrl", text: "요청 URL"}},
                { value: { name: "sendDate", text: "요청일시"}},
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
