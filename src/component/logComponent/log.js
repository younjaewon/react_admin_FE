import { useState } from "react";
import Grid from ".././utilComponenet/gridComponent/ResizingGridTemplate";
import Modal from "../utilComponenet/modalComponent/LogModal";

const gridColumn = [
  { key: "comCd", width: 100, label: "회사코드", align: "center" },
  { key: "userName", width: 100, label: "유저명", align: "center" },
  { key: "logDay", width: 100, label: "발생일", align: "center" },
  { key: "logTime", width: 100, label: "발생시", align: "center" },
  { key: "message", width: 100, label: "예외 메세지", align: "center" },
  { key: "requestUrl", width: 100, label: "요청 url", align: "center" },
  { key: "sendDate", width: 100, label: "요청일시", align: "center" },
];

const gridData = [
  {
    value: {
      comCd: "test company",
      userName: "testname",
      logDay: "2022-02-03",
      logTime: "01:11:11",
      message: "test",
      requestUrl: "test.test",
      sendDate: "2022-02-03",
    },
  },
  {
    value: {
      comCd: "com",
      userName: "name",
      logDay: "2022-05-05",
      logTime: "12:21:11",
      message: "test",
      requestUrl: "test.test",
      sendDate: "2022-05-05",
    },
  },
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({});

  const openModal = (e) => {
    setData(e.item.value)
    if(modalOpen===false){
      setModalOpen(true);
    }
  }
  const modalClose = () => {
    if(modalOpen===true){
      setModalOpen(false);
    }
  }

  return (
    <>
      <div className="content-wrap">
        <div className="content">
          <div className="content-main">
            <div className="content-title">
              <h3>로그관리</h3>
            </div>
            <Grid gridColumn={gridColumn} gridData={gridData} onClick={openModal} />
            <Modal open={modalOpen} closeModal={modalClose} data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
