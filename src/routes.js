import { useRoutes } from "react-router-dom";
import Store from "./component/storeComponent/Store";
import StoreManageMenu from "./component/storeComponent/StoreManageMenu";
import Notice from "./component/customerSupComponent/Notice";
import StoreInquiry from "./component/customerSupComponent/StoreInquiry";
import Log from "./component/logComponent/log";
import StoreFormData from "./component/storeComponent/StoreFormData";
import StoreGridData from "./component/storeComponent/StoreGridData";

export default function Router() {
  return useRoutes([
    { path: "/storeManage", element: <Store /> },
    { path: "/storeManageMenu", element: <StoreManageMenu /> },
    { path: "/storeFormData", element: <StoreFormData /> },
    { path: "/storeGridData", element: <StoreGridData /> },
    { path: "/notice", element: <Notice /> },
    { path: "/storeInquiry", element: <StoreInquiry /> },
    { path: "/logManage", element: <Log /> },
  ]);
}
