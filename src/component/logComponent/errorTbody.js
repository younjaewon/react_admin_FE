import React from "react";
import ErrorLogModal from "./errorLogmodal";

export default function Tbody(props) {
  return (
    <tbody className="h25 ">
      <tr>
        <td className="verMid textMid">{props.companyCode}</td>
        <td className="verMid textMid">{props.name}</td>
        <td className="verMid textMid">{props.date}</td>
        <td className="verMid textMid">{props.time}</td>
        <td className="textMid verMid ">
          <ErrorLogModal state={{ id: props.link }} />
        </td>
      </tr>
    </tbody>
  );
}
