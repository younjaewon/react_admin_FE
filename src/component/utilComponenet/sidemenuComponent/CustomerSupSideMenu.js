import React from "react";
import { useState } from "react";
import SideMenuTitle from "./sidemenu/SideMenuName";
import SideMenuList from "./sidemenu/SideMenuList";

export default function HOMESIDEMENU() {
  const [side, setSide] = useState(0);
  const [itemList, setItemList] = useState(0);
  const [item1, setItem1] = useState(0);
  const [item2, setItem2] = useState(0);
  const [item3, setItem3] = useState(0);

  return (
    <>
      <div
        className={side === 1 ? "sideButton-ac" : "sideButton"}
        onClick={() => {
          if (side === 0) {
            setSide(1);
          } else if (side === 1) {
            setSide(0);
          }
        }}
      ></div>

      <div className={side === 1 ? "itemList-hidden" : ""}>
        <div
          className={itemList === 1 ? "itemListButton-ac" : "itemListButton"}
          onClick={() => {
            if (itemList === 0) {
              setItemList(1);
              setItem1(1);
              setItem2(1);
              setItem3(1);
            } else if (itemList === 1) {
              setItemList(0);
              setItem1(0);
              setItem2(0);
              setItem3(0);
            }
          }}
        ></div>
      </div>

      <div className={side === 1 ? "gnb-sideMenu-ac" : "gnb-sideMenu"}>
        <SideMenuTitle title="고객지원"></SideMenuTitle>

        <div
          className={item1 === 1 ? "listname-active" : "listname"}
          onClick={() => {
            if (item1 === 0) {
              setItem1(1);
            } else if (item1 === 1) {
              setItem1(0);
            }
          }}
        >
          고객지원
        </div>
        <ul className={item1 === 1 ? "listGroup" : "listGroup-hidden"}>
          <SideMenuList link="/notice" name="공지사항"></SideMenuList>
          <SideMenuList link="/storeInquiry" name="입점사문의"></SideMenuList>
        </ul>
      </div>
    </>
  );
}
