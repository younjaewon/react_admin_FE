import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import Grid from ".././utilComponenet/gridComponent/ResizingGridTemplate";
import BASE_URL from "../../utils/Api";

const gridColumn = [
  { key: "companyIdx", width: 100, label: "No", align: "center" },
  { key: "subject", width: 150, label: "제목", align: "center" },
  { key: "regidate", width: 150, label: "날짜", align: "center" },
  { key: "companyName", width: 150, label: "입점사", align: "center" },
  { key: "writerName", width: 100, label: "작성자", align: "center" },
  { key: "isreply", width: 100, label: "답변여부", align: "center" },
];

export default function StoreInquiry() {
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL + "/systemQna").then((response) => {
      gridSetData(response.data);
      console.log("response : ", response);
    });
  }, []);

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

  return (
    <>
      <div className="content-wrap">
        <div className="content">
          <div className="content-main">
            <div className="content-title">
              <h3>입점사문의</h3>
            </div>
            <Grid gridColumn={gridColumn} gridData={gridData} />
          </div>
        </div>
      </div>
    </>
  );
}
