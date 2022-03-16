import React from "react";
import { useState } from "react";
import ModalComponent from "./ModalComponent";
import Form from "../formComponent/FormComponent";

const Modal = ({ open, closeModal, changeModalForm }) => {
  return (
    <div>
      <ModalComponent
        open={open}
        close={closeModal}
        header="재고등록"
        main={
          <>
            <Form
              items={[
                { value: { name: "label", text: "메뉴명" } },
                { value: { name: "orders", text: "정렬순서" } },
              ]}
              changeForm={changeModalForm}
            />
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>품목</label>
                  </td>
                  <td>
                    <label>품목코드</label>
                  </td>
                  <td>
                    <label>수량</label>
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                </tr>
              </tbody>
            </table>
          </>
        }
      />
    </div>
  );
};

export default Modal;
