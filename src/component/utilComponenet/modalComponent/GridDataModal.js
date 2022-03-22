import React, { useCallback, useEffect, useRef, useState } from "react";
import ModalComponent from "./ModalComponent";
import Form from "../formComponent/FormComponent";
import axios from "axios";
import BASE_URL from "../../../utils/Api";

const GridDataModal = ({
  open,
  closeModal,
  columnList,
  groupIndexNo,
}) => {
  const [gridData, setGridData] = useState([]);
  const [formDataGrid, setFormDataGrid] = useState({
    label:"",
    datakey: "",
    width: "",
    align: "",
    orders: "",
    upIdx:""
  });
  const indexNo = useRef("");

  useEffect(() => {
    axios
      .get(BASE_URL + "/menuFormGrid", {
        params: { groupIdx: groupIndexNo },
      })
      .then((response) => {
        console.log(response.data);
        setGridData(response.data);
      });
  }, [groupIndexNo,indexNo.current]);

  const addMenuFormGrid = useCallback(() => {
    let newFormData = new FormData();
    console.log(formDataGrid);
    console.log(groupIndexNo);

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
            groupIdx: groupIndexNo,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    axios
      .post(BASE_URL + "/menuFormGrid", newFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => { 
        {
          console.log(response.data)
          // setFormData({
          //   label : "",
          //   datakey : "",
          //   width : "",
          //   align : "",
          //   orders : "",
          //   upIdx : ""
          // });
        }
      });
  }, []);

  const updateMenuGrid = useCallback(() => {
    debugger
    console.log(formDataGrid);

  },[])

  // const deleteMenuGrid = useCallback(() => {
  //   const newFormData = { ...formData, indexNo: indexNo.current };
  //   axios.put(BASE_URL + "/menuFormGrid", newFormData).then((response) => {
  //     console.log(response);
  //     setFormData({
  //       label: "",
  //       datakey: "",
  //       width: "",
  //       align: "",
  //       orders: "",
  //       upIdx: "",
  //     });
  //   });
  // },[])

  const changeForm = (e) => {
    setFormDataGrid({ ...formDataGrid, [e.target.name]: e.target.value });
    console.log(formDataGrid);
  };

  const handleChange = (e) => {
    const domArray = Array.from(e.target.parentElement.parentElement.childNodes);
    const updateArrayForm = domArray.map((item, index) => {
      if (undefined == (domArray[index].childNodes[0])) {
        return ""
      }
      return domArray[index].childNodes[0]
    });
    indexNo.current = updateArrayForm[0].textContent;
    setFormDataGrid({
      label: updateArrayForm[1].textContent,
      datakey: updateArrayForm[2].textContent ? updateArrayForm[2].textContent : "",
      width: updateArrayForm[3].textContent,
      align: updateArrayForm[4].textContent,
      orders: updateArrayForm[5].textContent,
      upIdx: updateArrayForm[6].textContent,
    });
    console.log(formDataGrid);
  }

  const handleUpIdx = (e) => {
    if (e.target.tagName === "TD") {
      // if (e.target.parentElement.className == "none-active-ele") {
      //   e.target.parentElement.className = "active-ele";
      // } else {
      //   e.target.parentElement.className = "none-active-ele";
      // }
      const indexNo = e.target.parentElement.attributes.name.value;
    }
  }
  
  const columnListSet = () => {
    const columItem = gridData.map((item) => (
      <tr
        className="none-active-ele"
        onClick={handleUpIdx}
        name={item.indexNo}
        key={item.indexNo}
      >
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
          <button>삭제</button>
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
        updateModalCoulmn={updateMenuGrid}
        header="그리드 form 등록"
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
                    name: "align",
                    text: "align",
                    content: formDataGrid.align,
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

export default GridDataModal;
