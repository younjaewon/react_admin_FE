import React from "react";
import "./compage.css";
import ContentTitle from "../component/content/ContentTitel";
import {NormalButton, BigButton, SmallButton, LinkButton, MissButton} from "../component/buttons/buttons";
import {GroupButton3, GroupButton4} from "../component/buttons/groupbutton";

export default function Buttons() {
    return( 
        <>
        <div className="content-wrap">
            <div className="content">
                <div className="content-main">
                    <ContentTitle title="버튼"></ContentTitle>
                    <div className="left-frame">
                        <div className="form-frame frame1">
                            <label>
                                버튼 크기
                            </label>

                            <div className="form-groups">
                                <BigButton name="큰 버튼"></BigButton>
                                <br/><br/>
                                <NormalButton name="기본 버튼"></NormalButton>
                                <br/><br/>
                                <SmallButton name="작은 버튼"></SmallButton>
                            </div>

                        </div>
                    </div>

                    <div className="left-frame">
                        <div className="form-frame frame1">
                            <label>
                                링크 버튼
                            </label>

                            <div className="form-groups">
                                <LinkButton link="" name="링크 버튼"></LinkButton>
                            </div>

                        </div>
                    </div>

                    <div className="left-frame">
                        <div className="form-frame frame1">
                            <label>
                                비활성 버튼
                            </label>

                            <div className="form-groups">
                            <MissButton name="비활성 버튼"></MissButton>
                            </div>

                        </div>
                    </div>

                    <div className="left-frame">
                        <div className="form-frame frame1">
                            <label>
                                버튼 모음
                            </label>

                            <div className="form-groups">
                            <p>3개 모음</p>
                            <GroupButton3 btn1="1번" btn2="2번" btn3="3번"></GroupButton3>
                            </div>

                            <div className="form-groups">
                            <p>4개 모음</p>
                            <GroupButton4 btn1="1" btn2="2" btn3="3" btn4="4"></GroupButton4>
                            </div>

                        </div>
                    </div>
                </div>
                    

            </div>
        </div>
        </>
    );
}