import Grid from ".././utilComponenet/gridComponent/ResizingGridTemplate";
import Form from ".././utilComponenet/formComponent/FormComponent";
import { useEffect, useState } from "react";
import axios from "axios";

const gridColumn = [
  { key: "cname", width: 150, label: "사업자명", align: "center" },
  { key: "bnumber", width: 150, label: "사업자등록번호", align: "center" },
  { key: "ctype1", width: 100, label: "업종", align: "center" },
  { key: "ctype2", width: 100, label: "업태", align: "center" },
  { key: "dname", width: 100, label: "대표자", align: "center" },
  { key: "dphone", width: 100, label: "대표자폰", align: "center" },
  { key: "damName", width: 100, label: "담당자", align: "center" },
  { key: "damPhone", width: 150, label: "담당자연락처", align: "center" },
  { key: "damcp", width: 100, label: "담당자휴대폰", align: "center" },
  { key: "damemail", width: 100, label: "담당자이메일", align: "center" },
  
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
const API_URL="http://cadd-175-119-149-98.ngrok.io";

export default function Home() {
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({});
  const [view, setView] = useState(1);

  const changeForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(()=> {
    axios.get(API_URL+"/company")
    .then((res)=>{
      setData(res.data);
      console.log(res)
    })
    .catch((err)=>{console.log(err)})
  },[])

  const viewData=[];
  for(let i=0; i<data.length; i++){
    viewData.push({value:data[i]})
  };

  const handelCreate = () => { 
    const createData = window.confirm("데이터를 생성 하시겠습니까?");
    
    const newFormData = new FormData;
    newFormData.append(
      "newFormData",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );
    if(createData){
      axios.post(API_URL+"/company", newFormData, {
          headers: {"content-type":"multipart/form-data"}
      }).then((response) => {
          console.log("create",response);
      }).catch((err) => {
          console.log(err);
      });
    }else{}
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
              onClick={handelCreate}
            >
              전송
            </button>
            <div style={{ display: "flex" }}>
              <Grid gridColumn={gridColumn} gridData={viewData} />
              <Form
                items={[
                  { value: { name: "cname", text: "사용자명" } },
                  { value: { name: "bnumber", text: "사업자등록번호" } },
                  { value: { name: "ctype1", text: "업종" } },
                  { value: { name: "ctype2", text: "업태" } },
                  { value: { name: "dname", text: "대표자명" } },
                  { value: { name: "dphone", text: "대표전화" } },
                  { value: { name: "dfax", text: "대표팩스" } },
                  { value: { name: "damName", text: "담당자명" } },
                  { value: { name: "damPhone", text: "담당자전화" } },
                  { value: { name: "damCp", text: "담당자휴대폰" } },
                  { value: { name: "damEmail", text: "담당자이메일" } },
                  { value: { name: "zipcode", text: "도로명" } },
                  { value: { name: "addr1", text: "주소" } },
                  { value: { name: "addr2", text: "상세주소" } },
                  { value: { name: "usedomain", text: "도메인" } },
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
