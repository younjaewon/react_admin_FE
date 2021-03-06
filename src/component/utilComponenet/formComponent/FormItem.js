import React from "react";

const FormItem = ({ text, name, changeForm, content, readOnly }) => {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "100%",
          height: "90%",
          background: "#F6F6F6",
          marginBottom: "5px",
          paddingLeft: "5px",
          fontSize: "1.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        {text}
      </div>
      <div style={{ marginLeft: "5px", width: "100%" }}>
        <input
          name={name}
          style={{ width: "100%", height: "90%" }}
          onChange={changeForm}
          placeholder={text}
          value={content}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};
export default FormItem;
