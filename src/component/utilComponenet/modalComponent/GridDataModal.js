import React from "react";
import ModalComponent from "./ModalComponent";
import Form from "../formComponent/FormComponent";

const GridDataModal = ({
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
        <td>{item.groupName}</td>
        <td>
          <button style={{background:"red"}} name={item.indexNo} onClick={columnDel}>
            폼 등록
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
                { value: { name: "groupName", text: "그룹이름" } },
                { value: { name: "orders", text: "정렬순서" } },
                { value: { name: "groupShow", text: "형식(form/grid)" } },
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

export default GridDataModal;
