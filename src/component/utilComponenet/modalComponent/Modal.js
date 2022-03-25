import React from "react";
import ModalComponent from "./ModalComponent";
import Form from "../formComponent/FormComponent";
import Select from "../formComponent/SelectComponent";

const Modal = ({
  open,
  closeModal,
  changeModalForm,
  addModalColumn,
  columnList,
  columnDel,
  handleChildModal,
}) => {
  const columnListSet = () => {
    const columItem = columnList.map((item) => (
      <tr key={item.indexNo}>
        <td>{item.indexNo}</td>
        <td>{item.orders}</td>
        <td>{item.groupName}</td>
        <td>
          <button
            style={{
              background: "#f94c4c",
              borderRadius: "5px",
              margin: "1px",
              color: "white",
            }}
            name={item.indexNo}
            onClick={handleChildModal.formOpen.formOpenModal} // FormDataModal.js Open
          >
            폼 등록
          </button>
          <button
            style={{
              background: "#6c6cff",
              borderRadius: "5px",
              margin: "1px",
              color: "white",
            }}
            name={item.indexNo}
            onClick={handleChildModal.gridOpen.gridOpenModal} // GridDataModal.js Open
          >
            그리드 등록
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
        header="폼 그룹등록"
        main={
          <>
            <Form
              items={[
                { value: { name: "groupName", text: "그룹이름" } },
                { value: { name: "orders", text: "정렬순서" } },
              ]}
              changeForm={changeModalForm}
            />
            <Select
              name="groupShow"
              items={[
                { name: "form", value: "form" },
                { name: "grid", value: "grid" },
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
                    <label>그룹이름</label>
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
