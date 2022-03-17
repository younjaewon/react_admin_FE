import varValueConvert from "cross-env/src/variable";
import React from "react";
import FormItem from "./FormItem";

const FormComponent = ({ items, changeForm, readOnly }) => {
  return (
    <div style={{ flex: "1" }}>
      {items.map((item) => (
        <FormItem
          key={item.value.name}
          text={item.value.text}
          name={item.value.name}
          content={item.value.content}
          changeForm={changeForm}
          readOnly={readOnly}
        />
      ))}
    </div>
  );
};

export default FormComponent;