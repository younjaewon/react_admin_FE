import Grid from ".././utilComponenet/gridComponent/ResizingGridTemplate";
import Form from ".././utilComponenet/formComponent/FormComponent";
import { useEffect, useState } from "react";
import BASE_URL from "../../utils/Api";
import axios from "axios";

const gridColumn = [
  { key: "indexNo", width: 100, label: "No", align: "center" },
  { key: "memo", width: 150, label: "제목", align: "center" },
  { key: "regidate", width: 150, label: "작성일", align: "center" },
];

// const gridData = [
//   {
//     value: {
//       index_no: "불출",
//       c_name: "1",
//       b_number: "2022-02-03",
//       b_number: "생산부",
//       d_name: "김생산",
//       dam_name: "A220201153201",
//       dam_phone: "A-001",
//     },
//   },
//   {
//     value: {
//       index_no: "불출1",
//       c_name: "2",
//       b_number: "2022-02-03",
//       b_number: "생산부2",
//       d_name: "김생산2",
//       dam_name: "A220201153202",
//       dam_phone: "A-002",
//     },
//   },
// ];

export default function Notice() {
  const [boardData, setBoardData] = useState({
    subject: "",
    memo: "",
    file: "",
  });
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL + "/systemBoard").then((response) => {
      gridSetData(response.data);
      console.log("response : ", response);
    });
  }, []);

  const changeForm = (e) => {
    setBoardData({ ...boardData, [e.target.name]: e.target.value });
  };

  const textChange = (e) => {
    setBoardData({ ...boardData, memo: e.target.value });
  };

  const addBoard = (e) => {
    console.log(boardData);
    let newFormData = new FormData();
    newFormData.append(
      "newFormData",
      new Blob(
        [
          JSON.stringify({
            subject: boardData.subject,
            memo: boardData.memo,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    newFormData.append("file", boardData.file);

    axios
      .post(BASE_URL + "/systemBoard", newFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) =>
        setBoardData({
          subject: "",
          memo: "",
          file: "",
        })
      );
  };

  const gridSetData = (datas) => {
    const gridArraySet = [];
    datas.map((data) => {
      {
        const value = { value: data };
        gridArraySet.push(value);
      }
    });
    setGridData(gridArraySet);
  };

  const handleFile = (e) => {
    console.log(e.target);
    setBoardData({ ...boardData, file: e.target.files[0] });
  };

  return (
    <>
      <div className="content-wrap">
        <div className="content">
          <div className="content-main">
            <div className="content-title">
              <h3>공지사항</h3>
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
              onClick={addBoard}
            >
              등록
            </button>
            <div style={{ display: "flex" }}>
              <Grid gridColumn={gridColumn} gridData={gridData} />
              <div style={{ flex: "1" }}>
                <Form
                  items={[
                    {
                      value: {
                        name: "subject",
                        text: "제목",
                      },
                    },
                  ]}
                  changeForm={changeForm}
                />
                <textarea
                  name="memo"
                  onChange={textChange}
                  style={{ width: "100%", height: "500px" }}
                />
                <input type="file" onChange={handleFile} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
