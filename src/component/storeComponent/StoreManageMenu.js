import "antd/dist/antd.css";
import { Tree } from "antd";
import Form from ".././utilComponenet/formComponent/FormComponent";
import Modal from "../utilComponenet/modalComponent/Modal";
import { useState } from "react";

const treeData = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
            children: [
              {
                title: "leaf",
                key: "0-0-0-5",
              },
            ],
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: (
              <span
                style={{
                  color: "#1890ff",
                }}
              >
                sss
              </span>
            ),
            key: "0-0-1-0",
          },
        ],
      },
    ],
  },
];

export default function StoreManageMenu() {
  const [modalOpen, setModalOpen] = useState(false); //모달오픈
  const [formData, setFormData] = useState({});
  const [modalFormData, setModalFormData] = useState({});

  // 모달 열고 닫기할때 로그 불러오기
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalFormData({ menu_idx: "", label: "", orders: "" });
  };

  const onSelect = (selectedKeys, info) => {
    openModal();
    setModalFormData({ ...modalFormData, menu_idx: selectedKeys[0] });
    console.log("selected", selectedKeys, info);
  };

  const changeForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeModalForm = (e) => {
    setModalFormData({ ...modalFormData, [e.target.name]: e.target.value });
    console.log(modalFormData);
  };

  const changeSelect = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <div className="content-wrap">
        <div className="content">
          <div className="content-main">
            <div className="content-title">
              <h3>입점사사용 메뉴 관리</h3>
            </div>
            <div>
              <select onChanage={changeSelect}>
                <option value="1">0.1톤</option>
                <option value="2">0.2톤</option>
                <option value="3">0.3톤</option>
                <option value="4">0.4톤</option>
                <option value="5">0.5톤</option>
              </select>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ width: "10%", border: "1px solid" }}>
                <Tree
                  defaultExpandedKeys={["0-0-0", "0-0-1"]}
                  defaultSelectedKeys={["0-0"]}
                  onSelect={onSelect}
                  treeData={treeData}
                />
              </div>
              <div style={{ marginLeft: "100px", width: "100%" }}>
                <Form
                  items={[
                    { value: { name: "company_idx", text: "회사코드" } },
                    { value: { name: "name", text: "메뉴이름" } },
                    { value: { name: "codes", text: "코드" } },
                    { value: { name: "upmenu", text: "대메뉴번호" } },
                    { value: { name: "isregi", text: "isregi" } },
                    { value: { name: "isexcel", text: "isexcel" } },
                    {
                      value: {
                        name: "list_column_idx",
                        text: "list_column_idx",
                      },
                    },
                    { value: { name: "orders", text: "정렬" } },
                  ]}
                  changeForm={changeForm}
                />
              </div>
              <Modal
                open={modalOpen}
                closeModal={closeModal}
                changeModalForm={changeModalForm}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
