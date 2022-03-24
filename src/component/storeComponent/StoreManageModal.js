import BASE_URL from "../../utils/Api"
import { useEffect,useState } from "react";
import axios from "axios";
import Grid from ".././utilComponenet/gridComponent/ResizingGridTemplate";
import FirstModal from "../utilComponenet/modalComponent/SearchGridModal"
import SecundModal from "../utilComponenet/modalComponent/SndModal"

const gridColumn = [
    { key: "gridname", width: 150, label: "그리드명", align: "center" },
    { key: "dataApi", width: 150, label: "데이터호출 API", align: "center" ,
        formatter: function(args){
            return args.value === "" ? <span>&nbsp;</span> : args.value; 
            // return args.value;
        }},
];

const gridColumn2 = [
    { key: "label", width: 150, label: "컬럼명", align: "center" },
    { key: "datakey", width: 150, label: "데이터키", align: "center",
    formatter: function(args){
        return args.value === "" ? <span>&nbsp;</span> : args.value; 
        // return args.value;
    }
    },
    { key: "width", width: 150, label: "길이", align: "center" },
    { key: "align", width: 150, label: "정렬", align: "center" },
    { key: "orders", width: 150, label: "순서", align: "center" },
];
export default function StoreManageMenu(){
    const [companyNo, setCompanyNo] = useState("2"); // select box 회사 코드 데이터
    const [selectCompany, setSelectCompany] = useState([]); // 입점사 Select 데이터
    const [gridData, setGridData] = useState([]);
    const [gridData2, setGridData2] = useState([]);
    const [fstModalOpen, setFstModalOpen] = useState(false);
    const [sndModalOpen, setSndModalOpen] = useState(false);

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
      const gridSetData2 = (datas) => {
        const gridArraySet = [];
        datas.map((data) => {
          {
            const value = { value: data };
            gridArraySet.push(value);
          }
        });
        setGridData2(gridArraySet);
      };

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
    
    useEffect(() => {
        axios.get(BASE_URL + "/searchGrid",{
            params: {companyIdx: companyNo},
        })
        .then((response) => {
            gridSetData(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    },[companyNo]);
    const handelAddColumn = (e) => {
        console.log("aaaaa");
    }

    const changeSelect = (e) => {
        setCompanyNo(e.target.value);
      };
    

    const handelFstModalOpen = () => {
        setFstModalOpen(true);
    }
    const handelSndModalOpen = () => {
        setSndModalOpen(true);
    }
    const handelModalClose = () => {
        setFstModalOpen(false);
        setSndModalOpen(false);
    }


    const clickItem = (e) => {
        if(e.item){
            var data = e.item.value;
            axios.get(BASE_URL + "/searchGridColumn",{
                params: {gridIdx:data.indexNo},
            })
            .then((response) => {
                gridSetData2(response.data);
            })
            .catch(err => console.log(err));
        }
    }
    const clickItem2 = (e) => {
        if(e.item){
            console.log(e.item.value);
        }
    }
    return (
        <>
            <div className="content-wrap">
                <div className="content">
                    <div className="content-main">
                        <div className="content-title">
                            <h3>입점사사용 모달 관리</h3>
                        </div>
                        <div>
                            <select onChange={changeSelect} style={{width:"150px",height:"100px"}}>
                                {selectCompany.map(item => 
                                    <option key={item.indexNo} value={item.indexNo}>
                                        {item.cname}
                                    </option>
                                )}
                            </select>
                            
                        </div>
                        <div style={{display:"flex",marginTop:"10px"}}>
                            <div style={{width:"50%",border:"1px solid"}}>
                                <button onClick={handelFstModalOpen} >등록</button>
                                <Grid 
                                    gridColumn={gridColumn}
                                    gridData={gridData}
                                    onClick={clickItem}
                                ></Grid>
                                <FirstModal open={fstModalOpen} closeModal={handelModalClose} addModalColumn={handelAddColumn}></FirstModal>
                            </div>
                            <div style={{width:"50%",border:"1px solid"}}>
                                <button onClick={handelSndModalOpen}>등록</button>
                                <Grid
                                    gridColumn={gridColumn2}
                                    gridData={gridData2}
                                    onClick={clickItem2}
                                >
                                </Grid>
                                <SecundModal open={sndModalOpen} closeModal={handelModalClose}></SecundModal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}