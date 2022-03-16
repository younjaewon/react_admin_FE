import Grid from ".././utilComponenet/gridComponent/ResizingGridTemplate";
import Form from ".././utilComponenet/formComponent/FormComponent";
import { useState } from "react";

const gridColumn = [
  { key: "index_no", width: 100, label: "No", align: "center" },
  { key: "c_name", width: 150, label: "사업자명", align: "center" },
  { key: "b_number", width: 150, label: "사업자등록번호", align: "center" },
  { key: "d_name", width: 100, label: "대표자", align: "center" },
  { key: "dam_name", width: 100, label: "담당자", align: "center" },
  { key: "dam_phone", width: 150, label: "담당자연락처", align: "center" },
];

const gridData = [
  {
    value: {
      index_no: "불출",
      c_name: "1",
      b_number: "2022-02-03",
      b_number: "생산부",
      d_name: "김생산",
      dam_name: "A220201153201",
      dam_phone: "A-001",
    },
  },
  {
    value: {
      index_no: "불출1",
      c_name: "2",
      b_number: "2022-02-03",
      b_number: "생산부2",
      d_name: "김생산2",
      dam_name: "A220201153202",
      dam_phone: "A-002",
    },
  },
];
export default function Home() {
  const [formData, setFormData] = useState({});

  const changeForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="content-wrap">
        <div className="content">
          <div className="content-main">
            <div className="content-title">
              <h3>입점사관리</h3>
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
            >
              전송
            </button>
            <div style={{ display: "flex" }}>
              <Grid gridColumn={gridColumn} gridData={gridData} />
              <Form
                items={[
                  { value: { name: "no", text: "넘버" } },
                  { value: { name: "c_name", text: "사용자명" } },
                  { value: { name: "b_number", text: "사업자등록번호" } },
                  { value: { name: "c_type1", text: "업종" } },
                  { value: { name: "c_type2", text: "업태" } },
                  { value: { name: "d_name", text: "대표자명" } },
                  { value: { name: "d_phone", text: "대표전화" } },
                  { value: { name: "d_fax", text: "대표팩스" } },
                  { value: { name: "dam_name", text: "담당자명" } },
                  { value: { name: "dam_phone", text: "담당자전화" } },
                  { value: { name: "dam_cp", text: "담당자휴대폰" } },
                ]}
                changeForm={changeForm}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
