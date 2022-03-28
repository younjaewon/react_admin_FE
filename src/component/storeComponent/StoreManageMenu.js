import "antd/dist/antd.css";
import { Tree } from "antd";
import Form from ".././utilComponenet/formComponent/FormComponent";
import Modal from "../utilComponenet/modalComponent/Modal";
import { useCallback, useEffect, useState } from "react";
import BASE_URL from "../../utils/Api";
import axios from "axios";
import GridDataModal from ".././utilComponenet/modalComponent/GridDataModal";
import FormDataModal from "../utilComponenet/modalComponent/FormDataModal";
import Select from "../utilComponenet/formComponent/SelectComponent";
import ColumnListModal from "../utilComponenet/modalComponent/ColumnListModal";

export default function StoreManageMenu() {
  const [modalOpen, setModalOpen] = useState(false); //모달오픈
  const [formModalOpen, setFormModalOpen] = useState(false); //모달오픈
  const [gridModalOpen, setGridModalOpen] = useState(false); //모달오픈
  const [columnModalOpen, setColumnModalOpen] = useState(false); //모달오픈
  const [formData, setFormData] = useState({}); // 메뉴 추가 폼 데이터
  const [modalFormData, setModalFormData] = useState({}); // 메뉴 그리드 Post 데이터
  const [treeMenu, setTreeMenu] = useState([]); // Tree 메뉴 데이터
  const [companyNo, setCompanyNo] = useState("1"); // select box 회사 코드 데이터
  const [menuIndexNo, setMenuIndexNo] = useState("");
  const [groupIndexNo, setGroupIndexNo] = useState(""); // modal 안에 grid/form Group IndexNo 지정
  const [menuColumnList, setMenuColumnList] = useState([]); // 메뉴 그리드 Get 데이터
  const [selectCompany, setSelectCompany] = useState([]); // 입점사 Select 데이터
  const [re, setRe] = useState(""); // 전송 후 재 렌더링

  useEffect(() => {
    axios
      .get(BASE_URL + "/menu", {
        params: { companyIdx: companyNo },
      })
      .then((response) => {
        setTreeMenu(response.data);
      });
  }, [companyNo, re]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/company")
      .then((response) => {
        setSelectCompany(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addMenu = (e) => {
    let menuFormData = new FormData();
    menuFormData.append(
      "newFormData",
      new Blob(
        [
          JSON.stringify({
            companyIdx: companyNo,
            name: formData.name,
            codes: formData.codes,
            upmenu: formData.upmenu,
            isregi: formData.isregi,
            regi_api: formData.regi_api,
            list_api: formData.list_api,
            view_api: formData.view_api,
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
      .then((response) => setRe(!re));
  };

  const updateMenu = () => {
    const newFormData = JSON.stringify({ ...formData });
    axios
      .put(BASE_URL + "/menu", newFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setRe(!re);
      });
  };

  const menuColumnGet = async () => {
    await axios
      .get(BASE_URL + "/menuFormGroup", { params: { menuIdx: menuIndexNo } })
      .then((response) => {
        console.log(response.data);
        setMenuColumnList(response.data);
      });
  };

  const menuColumnAdd = async () => {
    let newFormData = new FormData();
    console.log(modalFormData);
    newFormData.append(
      "newFormData",
      new Blob(
        [
          JSON.stringify({
            menuIdx: modalFormData.menu_idx,
            groupName: modalFormData.groupName,
            orders: modalFormData.orders,
            groupShow: modalFormData.groupShow,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    await axios
      .post(BASE_URL + "/menuFormGroup", newFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        menuColumnGet();
      });
  };

  const menuColumnDel = (e) => {
    const indexNo = e.target.name;
    // axios
    //   .delete(BASE_URL + "/menu/column", { data: { indexNo } })
    //   .then((response) => {
    //     console.log(response);
    //   });
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalFormData({ menu_idx: "", groupName: "", orders: "" });
  };

  const gridOpenModal = (e) => {
    setGroupIndexNo(e.target.name);
    setGridModalOpen(true);
  };

  const gridCloseModal = () => {
    setGridModalOpen(false);
  };

  const formOpenModal = (e) => {
    setGroupIndexNo(e.target.name);
    setFormModalOpen(true);
  };

  const ColumnOpenModal = (e) => {
    setColumnModalOpen(true);
  };

  const columnColseModal = () => {
    setColumnModalOpen(false);
  };

  const formCloseModal = () => {
    setFormModalOpen(false);
  };

  const onSelect = (selectedKeys, info) => {
    if (info.node.isLeaf) {
      setModalFormData({ ...modalFormData, menu_idx: selectedKeys[0] });
      setMenuIndexNo(info.node.indexNo);
      setFormData({
        ...formData,
        indexNo: info.node.indexNo,
        companyIdx: companyNo,
        name: info.node.name,
        codes: info.node.codes,
        upmenu: info.node.upmenu,
        isregi: info.node.isregi,
        regi_api: info.node.regi_api,
        list_api: info.node.list_api,
        view_api: info.node.view_api,
        isexcel: info.node.isexcel,
        list_column_idx: info.node.listColumnIdx,
        orders: info.node.orders,
      }); // input Form에 데이터 세팅
    } else {
      setMenuIndexNo(info.node.indexNo);
      setFormData({
        ...formData,
        companyIdx: companyNo,
        name: info.node.name,
        codes: info.node.codes,
        upmenu: info.node.indexNo,
        isregi: info.node.isregi,
        regi_api: info.node.regi_api,
        list_api: info.node.list_api,
        view_api: info.node.view_api,
        isexcel: info.node.isexcel,
        list_column_idx: info.node.listColumnIdx,
        orders: info.node.orders,
      }); // input Form에 데이터 세팅
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

  const addFormGroup = (e) => {
    if (menuIndexNo === "") {
      window.alert("메뉴를 선택해주세요.");
    } else {
      menuColumnGet();
      openModal();
      console.log(menuIndexNo);
    }
  };

  const addListColumn = (e) => {
    if (menuIndexNo === "") {
      window.alert("메뉴를 선택해주세요.");
    } else {
      ColumnOpenModal();
      console.log(menuIndexNo);
    }
  };

  return (
    <>
      <div className="content-wrap">
        <div className="content">
          <div className="content-main">
            <div className="content-title">
              <h3>입점사사용 메뉴 관리</h3>
            </div>
            <button className="mes-button" onClick={addMenu}>
              등록
            </button>
            <button className="mes-button" onClick={updateMenu}>
              수정
            </button>
            <button
              style={{ background: "#4dd3d3" }}
              className="mes-button"
              onClick={addFormGroup}
            >
              폼 그룹 등록 모달
            </button>
            <button
              style={{ background: "#4dd3d3" }}
              className="mes-button"
              onClick={addListColumn}
            >
              리스트 컬럼 등록 모달
            </button>
            <div>
              <select onChange={changeSelect}>
                {selectCompany.map((item) => (
                  <option key={item.indexNo} value={item.indexNo}>
                    {item.cname}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", marginTop: "10px" }}>
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
                        name: "companyIdx",
                        text: "회사코드",
                        content: formData.companyIdx,
                        readOnly: true,
                      },
                    },
                    {
                      value: {
                        name: "upmenu",
                        text: "대메뉴번호",
                        content: formData.upmenu,
                      },
                    },
                    {
                      value: {
                        name: "name",
                        text: "메뉴이름",
                        content: formData.name,
                      },
                    },
                    {
                      value: {
                        name: "isregi",
                        text: "isregi",
                        content: formData.isregi,
                      },
                    },
                    {
                      value: {
                        name: "regi_api",
                        text: "regi_api",
                        content: formData.regi_api,
                      },
                    },
                    {
                      value: {
                        name: "list_api",
                        text: "list_api",
                        content: formData.list_api,
                      },
                    },
                    {
                      value: {
                        name: "view_api",
                        text: "view_api",
                        content: formData.view_api,
                      },
                    },

                    {
                      value: {
                        name: "isexcel",
                        text: "isexcel",
                        content: formData.isexcel,
                      },
                    },
                    {
                      value: {
                        name: "list_column_idx",
                        text: "list_column_idx",
                        content: formData.list_column_idx,
                      },
                    },
                    {
                      value: {
                        name: "orders",
                        text: "정렬",
                        content: formData.orders,
                      },
                    },
                  ]}
                  changeForm={changeForm}
                />
                <Select
                  name="codes"
                  items={[
                    { name: "선택", value: "0" },
                    { name: "companyform", value: "companyform" },
                    { name: "contlist", value: "contlist" },
                    { name: "contlistnview", value: "contlistnview" },
                    { name: "contviewud", value: "contviewud" },
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
                handleChildModal={{
                  gridOpen: { gridOpenModal },
                  formOpen: { formOpenModal },
                }}
              />
              <GridDataModal
                open={gridModalOpen}
                closeModal={gridCloseModal}
                groupIndexNo={groupIndexNo}
              />
              <FormDataModal
                open={formModalOpen}
                closeModal={formCloseModal}
                groupIndexNo={groupIndexNo}
              />
              <ColumnListModal
                open={columnModalOpen}
                closeModal={columnColseModal}
                menuIdx={menuIndexNo}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
