import Grid from ".././utilComponenet/gridComponent/ResizingGridTemplate";

export default function Home() {
  return (
    <>
      <div className="content-wrap">
        <div className="content">
          <div className="content-main">
            <div className="content-title">
              <h3>로그관리</h3>
            </div>
            <Grid />
          </div>
        </div>
      </div>
    </>
  );
}
