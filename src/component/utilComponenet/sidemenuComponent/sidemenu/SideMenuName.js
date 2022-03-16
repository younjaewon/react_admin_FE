import "./sideStyle.css"
import React from "react"

const SideMenuTitle = (props) => {
    return(
    <div className="sideMenuName">
        <h2>{props.title}</h2>
    </div>
    );
}
export default SideMenuTitle;