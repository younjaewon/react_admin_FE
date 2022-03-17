import React from "react";
import ModalComponent from "./ModalComponent";
import Form from "../formComponent/FormComponent";

const Modal = ({ open, closeModal, changeModalForm, addModalColumn }) => {
  return (
    <div>
      <ModalComponent
        open={open}
        close={closeModal}
        addModalColumn={addModalColumn}
        header="재고등록"
        main={
          <>
            <Form
              items={[
                { value: { name: "label", text: "컬럼명" } },
                { value: { name: "orders", text: "정렬순서" } },
              ]}
              changeForm={changeModalForm}
            />
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>순서</label>
                  </td>
                  <td>
                    <label>컬럼명</label>
                  </td>
                  <td>
                    <label>삭제</label>
                  </td>
                </tr>
                <tr>
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                </tr>
                <tr>
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                </tr>
                <tr>
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
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
