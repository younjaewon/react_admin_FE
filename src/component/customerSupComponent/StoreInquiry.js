import Grid from ".././utilComponenet/gridComponent/ResizingGridTemplate";

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

export default function StoreInquiry() {
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
