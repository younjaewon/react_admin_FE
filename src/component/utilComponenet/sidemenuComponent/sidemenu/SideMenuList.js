import "./sideStyle.css";
import React from "react";
import { Link } from "react-router-dom";

const SideMenuList = (props) => {
    return (
        <li className="li">
          <Link to={props.link} className="sideMenuText">{props.name}</Link>
        </li>
    );
}
export default SideMenuList;