import BASE_URL from "../../utils/Api"
import { useEffect,useState } from "react";
import axios from "axios";
import Grid from ".././utilComponenet/gridComponent/ResizingGridTemplate";
import FirstModal from "../utilComponenet/modalComponent/SearchGridModal"
import SecondModal from "../utilComponenet/modalComponent/SndModal"

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
    { key: "orders", width: 150, label: "순서", align: "center" }
];
export default function StoreManageMenu(){
    const [re, setRe] = useState(0);
    const [am, setAm] = useState(false);
    const [um, setUm] = useState(false);
    const [companyNo, setCompanyNo] = useState(1); // select box 회사 코드 데이터
    const [selectCompany, setSelectCompany] = useState([]); // 입점사 Select 데이터
    const [gridData, setGridData] = useState([]);
    const [gridData2, setGridData2] = useState([]);
    const [formData, setFormData] = useState({
        companyIdx: "",
        dataApi: "",
        gridname: "",
        indexNo: ""
    });
    const [fstModalOpen, setFstModalOpen] = useState(false);
    const [sndModalOpen, setSndModalOpen] = useState(false);
    const [grid1Item,setGrid1Item] = useState({});
    const [grid1ItemSelected,setGrid1ItemSelected] = useState(false);
    const [grid2Item,setGrid2Item] = useState({});
    const [grid2ItemTemp,setGrid2ItemTemp] = useState({});
    const [grid2ItemSelected,setGrid2ItemSelected] = useState(false);
    const [fstModalMod,setFstModalMod] = useState("");
    const [sndModalMod,setSndModalMod] = useState("");

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
            console.log(response);
            gridSetData(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    },[companyNo, re]);

    //첫번째 등록 모달
    const handelAddColumn = () => {
        console.log(formData);
        if(re===1){
            setRe(0);
        }else if(re===0){
            setRe(1);
        }
        const createColumn = window.confirm("생성 하시겠습니까?")
        const newFormData = new FormData;
        newFormData.append(
            "newFormData",
            new Blob([JSON.stringify(formData)], {type: "application/json"})
        );
        if(createColumn){            
        axios
          .post(BASE_URL + "/searchGrid", newFormData, {
            headers: { "content-type":"multipart/form-data" },
        }).then((response) => {
            console.log(response);
            console.log("create");
            
        }).catch((error) => {
            console.log(error);
        });
        setFstModalOpen(false);
        }else{}
    }

    //첫번째 수정 모달
    const handelUpdateColumn = () => {
        console.log(formData)
        if(re===1){
            setRe(0);
        }else if(re===0){
            setRe(1);
        }
        const updateColumn = window.confirm("수정 하시겠습니까?")
        if(updateColumn){
            axios.put(BASE_URL + "/searchGrid",{
                companyIdx: formData.companyIdx,
                dataApi: formData.dataApi,
                gridname: formData.gridname,
                indexNo: formData.indexNo,
            }).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            });
            setFstModalOpen(false);
        }else{}
    }


    //입력 데이터
    const changeForm = (e) => {
        setFormData({ companyIdx: companyNo, ...formData, [e.target.name]: e.target.value });
        console.log(formData)
    };

    const changeSelect = (e) => {
        console.log(e.target)
        setCompanyNo(e.target.value);
      };

    //모달
    const handleFstCreate = () => {
        setFormData({
            companyIdx: "",
            dataApi: "",
            gridname: "",
            indexNo: ""            
        });
        setFstModalMod("add");
        setFstModalOpen(true);
    }
    const handleFstUpdate = () => {
        if(formData.indexNo===""){
            window.alert("수정할 데이터를 선택하세요.")
        }else{
        setFstModalMod("mod");
        setFstModalOpen(true);
        }
    }

    const handleFstDelete = () => {
        if(grid1ItemSelected){
            const confirm = window.confirm("삭제하시겠습니까? \n삭제시 하위 모든 그리드 데이터가 삭제됩니다.");
            if(confirm){
                axios
                .delete(BASE_URL+"/searchGrid",
                {
                    data: grid1Item
                })
            }
        }else{
            alert("그리드를 선택하세요");
            return false;
        }
    }

    const handleSndCreate = () => {
        if(grid1ItemSelected){
            setSndModalMod("add");
            setSndModalOpen(true);
            setGrid2Item({
            indexNo:"",
            label: "",
            datakey: "",
            width: "",
            align: "",
            orders: "",});
        }else{
            alert("그리드를 선택하세요");
            return false;
        }
    }
    const handleSndUpdate = () => {
        if(grid2ItemSelected){
            setGrid2Item(grid2ItemTemp);
            setSndModalMod("mod");
            setSndModalOpen(true);
            
        }else{
            alert("컬럼을 선택하세요");
            return false;
        }
    }
    const handleSndDelete = () => {
        if(grid2ItemSelected){
            const confirm = window.confirm("삭제하시겠습니까?");
            if(confirm){
                axios
                .delete(BASE_URL+"/searchGridColumn",
                {
                    data: grid2Item
                })
            }
        }else{
            alert("컬럼을 선택하세요");
            return false;
        }
    }
    
    const handelModalClose = () => {
        setFstModalOpen(false);
        setSndModalOpen(false);
    }

    //데이터 클릭 이벤트
    const clickItem = (e) => {
        if(e.item){
            const data = e.item.value;
            setGrid1ItemSelected(true);
            setFormData(data);
            setGrid1Item(data);
            console.log(data);
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
            const data = e.item.value;
            setGrid2ItemSelected(true);
            setGrid2ItemTemp(data);
            setGrid2Item(data);
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
                            <select onChange={changeSelect} style={{width:"150px",height:"45px",fontSize:"20px"}}>
                                {selectCompany.map(item => 
                                    <option key={item.indexNo} value={item.indexNo}>
                                        {item.cname}
                                    </option>
                                )}
                            </select>
                            
                        </div>
                        <div style={{display:"flex",marginTop:"10px"}}>
                            <div style={{width:"49%"}}>
                                <div style={{textAlign:"right", marginRight:"10px"}}>
                                    <button onClick={handleFstCreate}>등록</button>
                                    <button onClick={handleFstUpdate}>수정</button>
                                    <button onClick={handleFstDelete}>삭제</button>
                                </div>
                                <div>
                                    <Grid 
                                        gridColumn={gridColumn}
                                        gridData={gridData}
                                        onClick={clickItem}
                                    />
                                </div>
                                <FirstModal 
                                    open={fstModalOpen}
                                    closeModal={handelModalClose}
                                    addModalColumn={handelAddColumn}
                                    updateModalColumn={handelUpdateColumn}
                                    changeModalForm={changeForm}
                                    data={formData}
                                    type={fstModalMod}
                                />
                            </div>
                            <div style={{width:"50%"}}>
                                <div style={{textAlign:"right"}}>
                                    <button onClick={handleSndCreate}>등록</button>
                                    <button onClick={handleSndUpdate}>수정</button>
                                    <button onClick={handleSndDelete}>삭제</button>
                                </div>
                                <div>
                                    <Grid
                                        gridColumn={gridColumn2}
                                        gridData={gridData2}
                                        onClick={clickItem2}
                                    >
                                    </Grid>
                                </div>
                                <SecondModal 
                                    open={sndModalOpen} 
                                    closeModal={handelModalClose} 
                                    data={grid1Item} 
                                    editData={grid2Item} 
                                    type={sndModalMod}></SecondModal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}