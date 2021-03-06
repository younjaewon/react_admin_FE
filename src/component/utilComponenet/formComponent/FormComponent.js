import React from "react";
import FormItem from "./FormItem";

const FormComponent = ({ items, changeForm }) => {
  return (
    <div style={{ flex: "1" }}>
      {items.map((item) => (
        <FormItem
          key={item.value.name}
          text={item.value.text}
          name={item.value.name}
          content={item.value.content}
          readOnly={item.value.readOnly}
          changeForm={changeForm}
        />
      ))}
    </div>
  );
};

export default FormComponent;
