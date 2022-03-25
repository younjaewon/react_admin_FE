import React, { useCallback, useEffect, useRef, useState } from "react";
import ModalComponent from "./ModalComponent";
import Form from "../formComponent/FormComponent";
import axios from "axios";
import BASE_URL from "../../../utils/Api";
import Select from "../formComponent/SelectComponent";

const FormDataModal = ({ open, closeModal, groupIndexNo }) => {
  const [formData, setFormData] = useState([]);
  const [menuFormData, setMenuFormData] = useState({
    name: "",
    elename: "",
    showtype: "",
    s_showtype:"",
    dataclass: "",
    predata: "",
    gonext: "",
    searchfield: "",
    orders: "",
    predatatype: "",
  });
  const [re, setRe] = useState(true);
  const indexNo = useRef("");

  useEffect(() => {
    axios
      .get(BASE_URL + "/menuFormElement", {
        params: { groupIdx: groupIndexNo },
      })
      .then((response) => {
        console.log(response.data);
        setFormData(response.data);
      });
  }, [groupIndexNo, re]);

  const deleteMenuGrid = (e) => {
    axios
      .delete(BASE_URL + "/menuFormElement", {
        data: { indexNo: e.target.name },
      })
      .then((response) => {
        setRe(!re);
        console.log(response);
      });
  };

  const addMenuFormGrid = () => {
    let newFormData = new FormData();

    newFormData.append(
      "newFormData",
      new Blob(
        [
          JSON.stringify({
            name: menuFormData.name,
            elename: menuFormData.elename,
            showtype: menuFormData.showtype,
            s_showtype:menuFormData.s_showtype,
            dataclass: menuFormData.dataclass,
            predata: menuFormData.predata,
            predatatype: menuFormData.predatatype,
            gonext: menuFormData.gonext,
            searchfield: menuFormData.searchfield,
            orders: menuFormData.orders,
            groupIdx: groupIndexNo,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    axios
      .post(BASE_URL + "/menuFormElement", newFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        {
          console.log(response.data);
          setMenuFormData({
            name: "",
            elename: "",
            showtype: "",
            s_showtype:"",
            dataclass: "",
            predata: "",
            gonext: "",
            searchfield: "",
            orders: "",
            predatatype: "",
          });
          setRe(!re);
        }
      });
  };

  const updateMenuGrid = () => {
    const newFormData = { ...menuFormData, indexNo: indexNo.current };
    axios.put(BASE_URL + "/menuFormElement", newFormData).then((response) => {
      console.log(response);
      setMenuFormData({
        name: "",
        elename: "",
        showtype: "",
        s_showtype:"",
        dataclass: "",
        predata: "",
        gonext: "",
        searchfield: "",
        orders: "",
        predatatype: "",
      });
      setRe(!re);
    });
  };

  const changeForm = (e) => {
    setMenuFormData({ ...menuFormData, [e.target.name]: e.target.value });
    console.log(menuFormData);
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
    setMenuFormData({
      ...menuFormData,
      name: updateArrayForm[2].textContent,
      elename: updateArrayForm[3].textContent,
      showtype: updateArrayForm[4].textContent ? updateArrayForm[4].textContent : "",
      s_showtype:updateArrayForm[5].textContent ? updateArrayForm[5].textContent: "",
      dataclass: updateArrayForm[6].textContent ? updateArrayForm[6].textContent : "",
      predata: updateArrayForm[7].textContent ? updateArrayForm[7].textContent : "",
      gonext: updateArrayForm[8].textContent ? updateArrayForm[8].textContent : "",
      searchfield: updateArrayForm[9].textContent ? updateArrayForm[9].textContent : "",
      orders: updateArrayForm[10].textContent,
    });
  }, []);

  useEffect(() => {
    console.log(menuFormData);
  },[menuFormData])

  const columnListSet = () => {
    const columItem = formData.map((item) => (
      <tr name={item.indexNo} key={item.indexNo}>
        <td>{item.indexNo}</td>
        <td>{item.groupIdx}</td>
        <td>{item.name}</td>
        <td>{item.elename}</td>
        <td>{item.showtype}</td>
        <td>{item.s_showtype}</td>
        <td>{item.dataclass}</td>
        <td>{item.predata}</td>
        <td>{item.gonext}</td>
        <td>{item.searchfield}</td>
        <td>{item.orders}</td>
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
        updateModalCoulmn={updateMenuGrid}
        header="메뉴 Form 등록"
        main={
          <>
            <Form
              items={[
                {
                  value: {
                    name: "name",
                    text: "name",
                    content: menuFormData.name,
                  },
                },
                {
                  value: {
                    name: "elename",
                    text: "elename",
                    content: menuFormData.elename,
                  },
                },
                {
                  value: {
                    name: "showtype",
                    text: "showtype",
                    content: menuFormData.showtype,
                  },
                },
                {
                  value: {
                    name: "s_showtype",
                    text: "s_showtype",
                    content: menuFormData.s_showtype,
                  },
                },
                {
                  value: {
                    name: "dataclass",
                    text: "dataclass",
                    content: menuFormData.dataclass,
                  },
                },
                {
                  value: {
                    name: "predata",
                    text: "predata",
                    content: menuFormData.predata,
                  },
                },
                {
                  value: {
                    name: "predatatype",
                    text: "predatatype",
                    content: menuFormData.predatatype,
                  },
                },
                {
                  value: {
                    name: "gonext",
                    text: "gonext",
                    content: menuFormData.gonext,
                  },
                },
                {
                  value: {
                    name: "orders",
                    text: "orders",
                    content: menuFormData.orders,
                  },
                },
              ]}
              changeForm={changeForm}
            />
            <Select
              name="searchfield"
              items={[
                { name: "N", value: "" },
                { name: "Y", value: "Y" },
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
                      <label>groupIdx</label>
                    </td>
                    <td>
                      <label>name</label>
                    </td>
                    <td>
                      <label>elename</label>
                    </td>
                    <td>
                      <label>showtype</label>
                    </td>
                    <td>
                      <label>s_showtype</label>
                    </td>
                    <td>
                      <label>dataclass</label>
                    </td>
                    <td>
                      <label>predata</label>
                    </td>
                    <td>
                      <label>gonext</label>
                    </td>
                    <td>
                      <label>searchfield</label>
                    </td>
                    <td>
                      <label>orders</label>
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

export default FormDataModal;
