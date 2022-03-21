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
        header="로그정보"
        main={
          <>
            <Form
              items={[
                { value: { name: "comCd", text: "회사코드", content: data.comCd}},
                { value: { name: "userName", text: "유저명", content: data.userName}},
                { value: { name: "logDay", text: "발생일", content: data.logDay}},
                { value: { name: "logTime", text: "발생시", content: data.logTime}},
                { value: { name: "message", text: "예외 메세지", content: data.message}},
                { value: { name: "requestUrl", text: "요청 URL", content: data.requestUrl}},
                { value: { name: "sendDate", text: "요청일시", content: data.sendDate}},
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
