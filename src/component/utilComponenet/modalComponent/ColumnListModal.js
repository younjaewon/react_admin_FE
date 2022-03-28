import React, { useCallback, useEffect, useRef, useState } from "react";
import ModalComponent from "./ModalComponent";
import Form from "../formComponent/FormComponent";
import axios from "axios";
import BASE_URL from "../../../utils/Api";
import Select from "../formComponent/SelectComponent";

const ColumnListModal = ({ open, closeModal, menuIdx }) => {
  const [gridData, setGridData] = useState([]);
  const [formDataGrid, setFormDataGrid] = useState({
    label: "",
    datakey: "",
    width: "",
    align: "",
    orders: "",
    upIdx: "",
  });
  const [re, setRe] = useState(true);
  const indexNo = useRef("");

  useEffect(() => {
    axios
      .get(BASE_URL + "/menu/column", {
        params: { menuIdx: menuIdx },
      })
      .then((response) => {
        console.log(response.data);
        setGridData(response.data);
      });
  }, [menuIdx, re]);

  const deleteMenuGrid = (e) => {
    axios
      .delete(BASE_URL + "/menu/column", { data: { indexNo: e.target.name } })
      .then((response) => {
        setRe(!re);
        console.log(response);
      });
  };

  const addMenuFormGrid = () => {
    let newFormData = new FormData();
    console.log(formDataGrid);
    newFormData.append(
      "newFormData",
      new Blob(
        [
          JSON.stringify({
            label: formDataGrid.label,
            datakey: formDataGrid.datakey,
            width: formDataGrid.width,
            align: formDataGrid.align,
            orders: formDataGrid.orders,
            upIdx: formDataGrid.upIdx,
            menuIdx: menuIdx,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    axios
      .post(BASE_URL + "/menu/column", newFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        {
          console.log(response.data);
          setFormDataGrid({
            label: "",
            datakey: "",
            width: "",
            align: "",
            orders: "",
            upIdx: "",
          });
          setRe(!re);
        }
      });
  };

  const updateMenuGrid = () => {
    const newFormData = { ...formDataGrid, indexNo: indexNo.current };
    axios.put(BASE_URL + "/menu/column", newFormData).then((response) => {
      console.log(response);
      setRe(!re);
    });
  };

  const changeForm = (e) => {
    setFormDataGrid({ ...formDataGrid, [e.target.name]: e.target.value });
    console.log(formDataGrid);
  };

  const handleChange = useCallback((e) => {
    const domArray = Array.from(
      e.target.parentElement.parentElement.childNodes
    );
    const updateArrayForm = domArray.map((item, index) => {
      if (undefined == domArray[index].childNodes[0]) {
        return "";
      }
      return domArray[index].childNodes[0];
    });
    indexNo.current = updateArrayForm[0].textContent;
    setFormDataGrid({
      ...formDataGrid,
      label: updateArrayForm[1].textContent,
      datakey: updateArrayForm[2].textContent,
      width: updateArrayForm[3].textContent,
      align: updateArrayForm[4].textContent,
      orders: updateArrayForm[5].textContent,
      upIdx: updateArrayForm[6].textContent,
    });
  }, []);

  const columnListSet = () => {
    const columItem = gridData.map((item) => (
      <tr name={item.indexNo} key={item.indexNo}>
        <td>{item.indexNo}</td>
        <td>{item.label}</td>
        <td>{item.datakey}</td>
        <td>{item.width}</td>
        <td>{item.align}</td>
        <td>{item.orders}</td>
        <td>{item.upIdx}</td>
        <td>{item.havechild}</td>
        <td>
          <button onClick={handleChange}>수정</button>
          <button name={item.indexNo} onClick={deleteMenuGrid}>
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
        addModalColumn={addMenuFormGrid}
        updateModalColumn={updateMenuGrid}
        header="리스트 컬럼 등록"
        main={
          <>
            <Form
              items={[
                {
                  value: {
                    name: "label",
                    text: "label",
                    content: formDataGrid.label,
                  },
                },
                {
                  value: {
                    name: "datakey",
                    text: "datakey",
                    content: formDataGrid.datakey,
                  },
                },
                {
                  value: {
                    name: "width",
                    text: "width",
                    content: formDataGrid.width,
                  },
                },
                {
                  value: {
                    name: "orders",
                    text: "orders",
                    content: formDataGrid.orders,
                  },
                },
                {
                  value: {
                    name: "upIdx",
                    text: "upIdx",
                    content: formDataGrid.upIdx,
                  },
                },
              ]}
              changeForm={changeForm}
            />
            <Select
              name="align"
              items={[
                { name: "선택", value: "" },
                { name: "center", value: "center" },
                { name: "left", value: "left" },
                { name: "right", value: "right" },
              ]}
              changeForm={changeForm}
            />

            <div style={{ overflow: "auto" }}>
              <table
                style={{
                  textAlign: "center",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <tbody>
                  <tr>
                    <td>
                      <label>indexNo</label>
                    </td>
                    <td>
                      <label>label</label>
                    </td>
                    <td>
                      <label>dataKey</label>
                    </td>
                    <td>
                      <label>width</label>
                    </td>
                    <td>
                      <label>align</label>
                    </td>
                    <td>
                      <label>orders</label>
                    </td>
                    <td>
                      <label>upIdx</label>
                    </td>
                    <td>
                      <label>haveChild</label>
                    </td>
                    <td>
                      <label>버튼</label>
                    </td>
                  </tr>
                  {columnListSet()}
                </tbody>
              </table>
            </div>
          </>
        }
      />
    </div>
  );
};

export default ColumnListModal;
