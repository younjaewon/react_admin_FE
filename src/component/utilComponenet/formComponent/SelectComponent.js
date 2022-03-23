import React from 'react';

const SelectComponent = ({ changeForm,items, name }) => {
  return (
    <div
      style={{
        display: "flex",
        background: "#F6F6F6",
        marginBottom: "5px",
        paddingLeft: "5px",
        fontSize: "1.5rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ width: "50%" }}>{name}</div>
      <select style={{ width: "50%" }} name={name} onChange={changeForm}>
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;