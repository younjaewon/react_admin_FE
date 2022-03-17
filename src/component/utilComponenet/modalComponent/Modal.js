import React from "react";
import ModalComponent from "./ModalComponent";
import Form from "../formComponent/FormComponent";

const Modal = ({
  open,
  closeModal,
  changeModalForm,
  addModalColumn,
  columnList,
  columnDel,
}) => {
  const columnListSet = () => {
    const columItem = columnList.map((item) => (
      <tr key={item.indexNo}>
        <td>{item.indexNo}</td>
        <td>{item.orders}</td>
        <td>{item.label}</td>
        <td>
          <button name={item.indexNo} onClick={columnDel}>
            삭제
          </button>
        </td>
      </tr>
    ));
    return columItem;
  };
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
            <table
              style={{ textAlign: "center", width: "100%", marginTop: "10px" }}
            >
              <tbody>
                <tr>
                  <td>
                    <label>메뉴번호</label>
                  </td>
                  <td>
                    <label>순서</label>
                  </td>
                  <td>
                    <label>컬럼명</label>
                  </td>
                  <td>
                    <label>버튼</label>
                  </td>
                </tr>
                {columnListSet()}
              </tbody>
            </table>
          </>
        }
      />
    </div>
  );
};

export default Modal;
