import "antd/dist/antd.css";
import { Tree } from "antd";
import Form from ".././utilComponenet/formComponent/FormComponent";
import Modal from "../utilComponenet/modalComponent/Modal";
import { useEffect, useState } from "react";
import BASE_URL from "../../utils/Api";
import axios from "axios";

export default function StoreManageMenu() {
  const [modalOpen, setModalOpen] = useState(false); //모달오픈
  const [formData, setFormData] = useState({});
  const [modalFormData, setModalFormData] = useState({});
  const [treeMenu, setTreeMenu] = useState([]);
  const [companyNo, setCompanyNo] = useState("1");
  const [menuIndexNo, setMenuIndexNo] = useState("");
  const [menuColumnList, setMenuColumnList] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/menu", {
        params: { companyIdx: companyNo },
      })
      .then((response) => {
        setTreeMenu(response.data);
      });
  }, [companyNo]);

  const addMenu = (e) => {
    let menuFormData = new FormData();
    menuFormData.append(
      "menuFormData",
      new Blob(
        [
          JSON.stringify({
            companyIdx: formData.company_idx,
            name: formData.name,
            codes: formData.codes,
            upmenu: formData.upmenu,
            isregi: formData.isregi,
            isexcel: formData.isexcel,
            listColumnIdx: formData.list_column_idx,
            orders: formData.orders,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    axios
      .post(BASE_URL + "/menu", menuFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => setCompanyNo("2"));
  };

  const menuColumnGet = async (menuIdx) => {
    await axios
      .get(BASE_URL + "/menu/column", { params: { menu_idx: menuIdx } })
      .then((response) => {
        console.log(response.data);
        setMenuColumnList(response.data);
      });
  };

  const menuColumnAdd = async () => {
    let newFormData = new FormData();

    newFormData.append(
      "newFormData",
      new Blob(
        [
          JSON.stringify({
            menuIdx: modalFormData.menu_idx,
            label: modalFormData.label,
            orders: modalFormData.orders,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    await axios
      .post(BASE_URL + "/menu/column", newFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        menuColumnGet(modalFormData.menu_idx);
        setModalFormData({ ...modalFormData, label: "", orders: "" });
      });
  };

  const menuColumnDel = (e) => {
    const indexNo = e.target.name;
    axios
      .delete(BASE_URL + "/menu/column", { data: { indexNo } })
      .then((response) => {
        console.log(response);
      });
  };

  // 모달 열고 닫기할때 로그 불러오기
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalFormData({ menu_idx: "", label: "", orders: "" });
  };

  const onSelect = (selectedKeys, info) => {
    if (info.node.isLeaf) {
      menuColumnGet(selectedKeys[0]);
      setModalFormData({ ...modalFormData, menu_idx: selectedKeys[0] });
      openModal();
    } else {
      setFormData({
        ...formData,
        company_idx: info.node.companyIdx,
        upmenu: info.node.indexNo,
      });
    }
    console.log("selected", selectedKeys, info);
  };

  const changeForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeModalForm = (e) => {
    setModalFormData({ ...modalFormData, [e.target.name]: e.target.value });
  };

  const changeSelect = (e) => {
    setCompanyNo(e.target.value);
  };

  return (
    <>
      <div className="content-wrap">
        <div className="content">
          <div className="content-main">
            <div className="content-title">
              <h3>입점사사용 메뉴 관리</h3>
            </div>
            <button
              style={{
                float: "right",
                width: "70px",
                borderRadius: "4px",
                border: "none",
                background: "red",
                height: "30px",
                lineHeight: "1.5em",
                textAlign: "center",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={addMenu}
            >
              전송
            </button>
            <div>
              <select onChange={changeSelect}>
                <option value="1">단디메카</option>
                <option value="2">산돌식품</option>
              </select>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ width: "10%", border: "1px solid" }}>
                <Tree
                  defaultExpandedKeys={["0-0-0", "0-0-1"]}
                  defaultSelectedKeys={["0-0"]}
                  onSelect={onSelect}
                  treeData={treeMenu}
                />
              </div>
              <div style={{ marginLeft: "100px", width: "100%" }}>
                <Form
                  items={[
                    {
                      value: {
                        name: "company_idx",
                        text: "회사코드",
                        readonly: "readonly",
                      },
                    },
                    {
                      value: {
                        name: "name",
                        text: "메뉴이름",
                      },
                    },
                    {
                      value: {
                        name: "codes",
                        text: "코드",
                      },
                    },
                    {
                      value: {
                        name: "upmenu",
                        text: "대메뉴번호",
                        readonly: "readonly",
                      },
                    },
                    {
                      value: {
                        name: "isregi",
                        text: "isregi",
                      },
                    },
                    {
                      value: {
                        name: "isexcel",
                        text: "isexcel",
                      },
                    },
                    {
                      value: {
                        name: "list_column_idx",
                        text: "list_column_idx",
                      },
                    },
                    {
                      value: {
                        name: "orders",
                        text: "정렬",
                      },
                    },
                  ]}
                  changeForm={changeForm}
                />
              </div>
              <Modal
                open={modalOpen}
                closeModal={closeModal}
                changeModalForm={changeModalForm}
                addModalColumn={menuColumnAdd}
                columnList={menuColumnList}
                columnDel={menuColumnDel}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
