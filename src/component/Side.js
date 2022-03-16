import React from "react";
import StoreSideMenu from "./utilComponenet/sidemenuComponent/StoreSideMenu";
import CustomerSupSideMenu from "./utilComponenet/sidemenuComponent/CustomerSupSideMenu";
import LogSideMenu from "./utilComponenet/sidemenuComponent/LogSideMenu";

import { useResultContext } from "../Context";

export default function Side() {
  const { sideMenu } = useResultContext();

  return (
    <>
      {sideMenu === 1 ? <StoreSideMenu /> : null}
      {sideMenu === 2 ? <CustomerSupSideMenu /> : null}
      {sideMenu === 3 ? <LogSideMenu /> : null}
    </>
  );
}
