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
export default function StoreManageMenu(){
    const [companyNo, setCompanyNo] = useState("2"); // select box 회사 코드 데이터
    const [selectCompany, setSelectCompany] = useState([]); // 입점사 Select 데이터
    const [gridData, setGridData] = useState([]);
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
            console.log(response.data);
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


    return (
        <>
            <div className="content-wrap">
                <div className="content">
                    <div className="content-main">
                        <div className="content-title">
                            <h3>입점사사용 모달 관리</h3>
                        </div>
                        <div>
                            <select onChange={changeSelect}>
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
                                ></Grid>
                                <FirstModal open={fstModalOpen} closeModal={handelModalClose} addModalColumn={handelAddColumn}></FirstModal>
                            </div>
                            <div style={{width:"50%",border:"1px solid"}}>
                                <button onClick={handelSndModalOpen}>등록</button>
                                2
                                <SecundModal open={sndModalOpen} closeModal={handelModalClose}></SecundModal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}